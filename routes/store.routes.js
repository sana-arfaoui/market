const {
  getMyStore,
  updateStore,
  getStore,
  getStores,
} = require("../controllers/store.controllers");
const { verifyToken, isMerchant, verifyStore } = require("../middlewares");

const router = require("express").Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 500000,
  // },
});

router.get("/me", verifyToken, isMerchant, getMyStore);
router.get("/", verifyStore, getStore);
router.put("/update", verifyToken, upload.single("logo"), updateStore);
router.get("/stores", getStores);

module.exports = router;
