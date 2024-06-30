const {
  createBlog,
  findBlog,
  deleteBlog,
  editBlog,
  getUserBLogs,
  getAllBLogs,
} = require("../model/blog");

exports.createBlog = async (author, title, description) => {
  try {
    const resp = await createBlog(author, title, description);
    return resp;
  } catch (err) {
    throw err;
  }
};

exports.getUserBLogs = async (_id) => {
  try {
    const resp = await getUserBLogs(_id);
    return resp;
  } catch (err) {
    throw err;
  }
};

exports.findBlog = async (_id) => {
  try {
    const resp = await findBlog(_id);
    return resp;
  } catch (err) {
    throw err;
  }
};

exports.getAllBLogs = async () => {
  try {
    const resp = await getAllBLogs();
    return resp;
  } catch (err) {
    throw err;
  }
};

exports.deleteBlog = async (id) => {
  try {
    return await deleteBlog(id);
  } catch (err) {
    throw err;
  }
};

exports.editBlog = async (id, title, description) => {
  try {
    return await editBlog(id, title, description);
  } catch (err) {
    throw err;
  }
};