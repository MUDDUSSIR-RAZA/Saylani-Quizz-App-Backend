const express = require("express");
const { createUser, login, updatePassword, updateName, updatePicture } = require("../controllers/auth");
const router = express.Router();

router.post("/signUp", async (req, res) => {
  console.log("🚀 ~ router.post ~ signUp:", "signUp")
  try {
    const resp = await createUser(
      req.body.name,
      req.body.fathername,
      req.body.nic,
      req.body.password,
      req.body.email,
      req.body.phone,
      req.body.city,
      req.body.course_name,
      req.body.batch
    );
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const resp = await login(req.body.email, req.body.password);
    res.status(200).json(resp)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/updatePassword", async (req, res) => {
  try {
    const resp = await updatePassword(req.body.email, req.body.oldPassword, req.body.confirmPassword);
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/updateName", async (req, res) => {
  try {
    const resp = await updateName(req.body.email, req.body.name);
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/updatePicture", async (req, res) => {
  try {
    const resp = await updatePicture(req.body.email, req.body.updatePic);
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
