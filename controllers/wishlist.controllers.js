const wishlist = require("../models/wishlist");
const Product = require("../models/product.models");
const addToWishlist = async (req, res) => {
  const product = req.product._id;
  const currentUser = req.verifiedUser._id;
  const alreadyAdded = await wishlist.findOne({
    $and: [{ product: product }, { author: currentUser }],
  });
  if (alreadyAdded) {
    try {
      await Product.findByIdAndUpdate(
        product,
        { isLiked: false },
        {
          new: true,
        }
      );
      await wishlist.findByIdAndDelete(alreadyAdded);

      return res
        .status(200)
        .json({ message: "product delete from  wish list" });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  try {
    await Product.findByIdAndUpdate(
      product,
      { isLiked: true },
      {
        new: true,
      }
    );

    const newWishItem = new wishlist({
      author: currentUser,
      product: product,
      isLiked: true,
    });
    const saveNewWishItem = await newWishItem.save();
    return res.status(201).json(saveNewWishItem);
  } catch (error) {
    return res.status(500).json(err);
  }
};

const getMyWishlist = async (req, res) => {
  const currentUser = req.verifiedUser._id;

  try {
    const gMyWishlist = await wishlist
      .find({ author: currentUser })
      .populate({ path: "product", select: "title slug price image" })
      .sort({ createdAt: -1 });
    return res.status(200).json(gMyWishlist);
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports.addToWishlist = addToWishlist;
module.exports.getMyWishlist = getMyWishlist;
