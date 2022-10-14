const {
  getMyProfile,
  updateProfile,
} = require("../controllers/profile.controllers");
const { verifyToken } = require("../middlewares");

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

router.get("/", verifyToken, getMyProfile);
router.put("/", verifyToken, upload.single("avatar"), updateProfile);
module.exports = router;
