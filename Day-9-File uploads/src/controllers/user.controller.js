const express = require("express");

const User = require("../models/user.model");

// const { uploadFiles } = require("../middlewares/uploads");
const upload = require("../middlewares/uploads")

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", upload.single("profilePic"), async (req, res) => {
    try {
      //   const user = await User.create(req.body)
      const user = await User.create({
        firstName: req.body.firstName,
        profilePic: req.file.path,
      });
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  router.patch("/update/:id", upload.single("profilePic"), async (req, res) => {
    try {
      //   const user = await User.create(req.body)
      const user = await User.findById(req.params.id);
      fs.unlink(user.profilePic, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("user profile  has been updated");
        }
      });
      //
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  // Deleting a post..
  router.delete("/delete/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      fs.unlink(user.profilePic, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("User  has been deleted");
        }
      });
      user.delete();
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // Router Post for Multiple Pics upload
  router.post("/multiple", upload.any("profilePic"), async (req, res) => {
    try {
      const filePaths = req.files.map((file) => {
        return file.path;
      });
  
      const user = await User.create({
        firstName: req.body.firstName,
        profilePic: filePaths,
      });
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  module.exports = router;
  