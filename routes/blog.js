const express = require("express");
const { createBlog, deleteBlog, editBlog, getAllBLogs, findBlog } = require("../controllers/blogs");
const { getUserBLogs } = require("../model/blog");
const { verify } = require("../middleware/auth");
const router = express.Router();

router.post("/publish", async (req, res) => {  
  try {
    const resp = await createBlog(req.body.author , req.body.title, req.body.description);
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get("/userBlogs", verify , async (req, res) => {
  try {
    const resp = await getUserBLogs(req.id);
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/findBlog" , async (req, res) => {
  try {
    const resp = await findBlog(req.body.userId);
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/allBlogs", async (req, res) => {
  try {
    const resp = await getAllBLogs();
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete("/delete", async (req, res) => {
  try {
    const resp = await deleteBlog(req.body.id);
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.patch("/update", async (req, res) => {
  try {
    const resp = await editBlog(req.body.id , req.body.title , req.body.description);
    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;