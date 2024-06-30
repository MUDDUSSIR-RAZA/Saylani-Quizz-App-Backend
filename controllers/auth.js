const {
  createUser,
  findUser,
  updatePassword,
  updateName,
  updatePicture,
} = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/db/user");

exports.createUser = async (userName , email, password) => {
  try {
    const hashPass = await bcrypt.hash(password, 12);
    return await createUser(userName, email, hashPass);
  } catch (err) {
    if (err.name === "ValidationError") {
      throw err.errors["email"].message;
    } else {
      throw err;
    }
  }
};

exports.login = async (email, password) => {
  try {
    const user = await findUser(email);
    if (!user) {
      throw "Wrong Email!";
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw "Wrong Password!";
    }

    let userId = user._id;

    let token = jwt.sign({ userId, email }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    return token;
  } catch (err) {
    throw err;
  }
};

exports.findUser = async (email) => {
  try {
    return await findUser(email);
  } catch (err) {
    throw err;
  }
};

exports.updatePassword = async (email, password, newPassword) => {
  const user = await findUser(email);
  if (!user) {
    throw "Wrong Email!";
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    throw "Wrong Password!";
  }
  try {
    const hashPass = await bcrypt.hash(newPassword, 12);
    return await updatePassword(email, hashPass);
  } catch (err) {
    throw err;
  }
};

exports.updateName = async (email, name) => {
  const user = await findUser(email);
  if (!user) {
    throw "Wrong Email!";
  }

  try {
    return await updateName(email, name);
  } catch (err) {
    throw err;
  }
};

exports.updatePicture = async (email, picture) => {
  const user = await findUser(email);
  if (!user) {
    throw "Wrong Email!";
  }

  try {
    return await updatePicture(email, picture);
  } catch (err) {
    throw err;
  }
};
