module.exports.isCustomer = (req, res, next) => {
  const currentUserRole = req.verifiedUser.role;
  if (currentUserRole === "customer") {
    next();
  } else {
    res.status(403).json("you are not an customer");
  }
};
