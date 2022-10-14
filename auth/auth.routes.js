const User = require("../models/user.models");
const Address = require("../models/address.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profile = require("../models/profile.models");
const Store = require("../models/store.models");
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const crypto = require("crypto");
const TokenMail = require("../models/tokenMail.model");
const { sendMail } = require("../utils/sendEmail");
router.post(`/register`, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(422).json({ message: "Email already exist" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  try {
    const newAddress = new Address({
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      zipCode: req.body.zipCode,
    });
    const savedAddress = await newAddress.save();

    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //* creation Profile
    const newProfile = new Profile();
    const savedProfile = await newProfile.save();
  
    const role = req.query.role;
    if (role === "merchant") {
      //* creation Store
      const newStore = new Store();
      const savedStore = await newStore.save();
      ///------
      const newUser = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        role: role,
        password: hashedPassword,
        address: savedAddress._id,
        profile: savedProfile._id,
        store: savedStore._id,
      });
      const savedUser = await newUser.save();
      //console.log(savedUser._id);
      // const token = await new TokenMail({
      //   user: savedUser._id,
      //   tokenMail: crypto.randomBytes(32).toString("hex"),
      // }).save();
      // console.log(token.tokenMail);
      // const url = `${process.env.HOST}:3000/user/${savedUser._id}/verify/${token.tokenMail}`;
      //console.log("url",url);
      // await sendMail(savedUser.email, "Verify Email", url);
      return res.status(201).json({
        savedUser: savedUser,
        message: "An Email sent to you account please verify",
      });
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: role,
      password: hashedPassword,
      address: savedAddress._id,
      profile: savedProfile._id,
    });
    const savedUser = await newUser.save();

    /* This is a token that is generated and sent to the user's email. */
    // const token = await new TokenMail({
    //   user: savedUser._id,
    //   tokenMail: crypto.randomBytes(32).toString("hex"),
    // }).save();
    // const url = `${process.env.HOST}:3000/user/${savedUser._id}/verify/${token.tokenMail}`;
    // await sendMail(savedUser.email, "Verify Email", url);

    return res.status(201).json({
      savedUser: savedUser,
      message: "An Email sent to you account please verify",
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get("/:id/verify/:tokenMail/", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "Invalid link 1" });

    const token = await TokenMail.findOne({
      user: user._id,
      tokenMail: req.params.tokenMail,
    });
    if (!token) return res.status(400).json({ message: "Invalid link" });

    await User.findByIdAndUpdate(
      user._id,
      { isVerified: true },
      {
        new: true,
      }
    );
    await token.remove();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "wrong password or email" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "wrong password or email" });
    }

    // if (!user.isVerified) {
    //   const token_mail = await TokenMail.findOne({ user: user._id });
    //   if (!token_mail) {
    //     const token_mail = await new TokenMail({
    //       user: user._id,
    //       tokenMail: crypto.randomBytes(32).toString("hex"),
    //     }).save();
    //     const url = `${process.env.HOST}:3000/user/${user._id}/verify/${token_mail.tokenMail}`;

    //     await sendMail(user.email, "Verify Email", url);
    //   }
    //   try {
    //     const url = `${process.env.HOST}:3000/user/${user._id}/verify/${token_mail.tokenMail}`;

    //     await sendMail(user.email, "Verify Email", url);

    //     return res
    //       .status(400)
    //       .json({ message: "An Email sent to you account please verify" });
    //   } catch (err) {
    //     return res.status(500).json({ message: "not ssent" });
    //   }
    // }

    const token = jwt.sign(
      /* payload */ {
        _id: user._id,
        email: user.email,
        name: user.firstName,
        store: user.store,
        profile: user.profile,
        address: user.address,
        isAdmin: user.isAdmin,
        role: user.role,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "3 days" }
    );
    //console.log(user._id)

    return res.status(200).json({ user: user, token: token });
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.put("/updateInfo", verifyToken, async (req, res) => {
  const currentUser = req.verifiedUser._id;
  try {
    const user = await User.findById(currentUser);
    // const old = req.body.oldPassword;
    // console.log(old);
    const isPasswordValid = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "wrong password " });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const updateUser = await User.findByIdAndUpdate(
      currentUser,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ message: "Update Successfully", updateUser: updateUser });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// router.get("/allCustomer/me", verifyToken, async (req, res) => {
//   try {
//     const customer = await User.find({ role: "customer" });
//     return res.status(200).json(customer);
//   } catch (err) {
//     return res.status(404).json(err);
//   }
// });

router.get("/check", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.verifiedUser._id)
      .populate("address")
      .populate({ path: "profile", select: "avatar birthday " });
    if (!user) {
      return res.status(404).json("not found admin");
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
