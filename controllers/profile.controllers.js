const Profile = require("../models/profile.models");

const getMyProfile = async (req, res) => {
  const profileId = req.verifiedUser.profile;
  console.log("profile id from current use", profileId);
  try {
    const profile = await Profile.findById(profileId);
    //console.log(profile);
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateProfile = async (req, res) => {
  const host = process.env.HOST;
  const port = process.env.PORT;
  const user = req.verifiedUser.profile;
  try {
    const updateProfile = await Profile.findByIdAndUpdate(
      user,
      {
        birthday: req.body.birthday,
        avatar: `${host}:${port}/images/${req.file.filename}`,
        bio: req.body.bio,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updateProfile);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.updateProfile = updateProfile;

module.exports.getMyProfile = getMyProfile;
