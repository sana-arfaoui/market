module.exports.isMerchant = (req, res, next) => {
    const currentUserRole = req.verifiedUser.role;
    if (currentUserRole === "merchant") {
      next();
    } else {
      res.status(403).json("you are not an merchant");
    }
  };
  