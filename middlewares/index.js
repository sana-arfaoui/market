const verifyToken = require("./verifyToken");
const verifyStore = require("./verifyStore");
const isAdmin = require("./isAdmin.js");
const { isMerchant } = require("./isMerchant");
const { isReviewOwner } = require("./isReviewOwner");
const { isCustomer } = require("./isCustomer");
const { isOrderOwner } = require("./isOrderOwner");

module.exports.verifyToken = verifyToken;
module.exports.isAdmin = isAdmin;
module.exports.isMerchant = isMerchant;
module.exports.isReviewOwner = isReviewOwner;
module.exports.isCustomer = isCustomer;
module.exports.verifyStore = verifyStore;
module.exports.isOrderOwner = isOrderOwner;
