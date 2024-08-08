const Blog = require("./db/blog");
const User = require("./db/user");

exports.createBlog = async (author, title, description) => {
  try {
    const blog = new Blog({
      author,
      title,
      description,
      date: Date.now(),
    });
    await blog.save();

    const user = await User.findByIdAndUpdate(author, {
      $push: { blogs: blog._id },
    });
    return "Blog Successfully Published!";
  } catch (err) {
    throw err;
  }
};

exports.findBlog = async (_id) => {
  try {
    const blog = await User.findOne({ _id }).populate("blogs");
    if (!blog) {
      throw ("Blog not found");
    }
    return blog;
  } catch (err) {
    throw err;
  }
};

exports.getUserBLogs = async (_id) => {
  try {
    const blog = await User.findOne({ _id }).populate("blogs");
    if (!blog) {
      throw ("Blog not found");
    }
    return blog;
  } catch (err) {
    throw err;
  }
};

exports.getAllBLogs = async (_id) => {
  try {
    const blog = await Blog.find().populate("author");
    if (!blog) {
      throw ("Blog not found");
    }
    return blog;
  } catch (err) {
    throw err;
  }
};

exports.deleteBlog = async (_id) => {
  try {
    const result = await Blog.findOneAndDelete({ _id });
    if (!result) {
      throw "Blog not Found!";
    }
    const authorId = result.author;
    await User.findByIdAndUpdate(authorId, { $pull: { blogs: _id } });
    return "Blog Successfully Deleted!";
  } catch (err) {
    throw err;
  }
};

exports.editBlog = async (_id, title, description) => {
  try {
    const blog = {
      title,
      description,
      date: Date.now(),
    };
    const result = await Blog.findOneAndUpdate({ _id }, blog, { new: true });
    if (!result) {
      throw "Blog not Found!";
    }
    return "Blog Successfully Updated!";
  } catch (err) {
    throw err;
  }
};
