const {
  createUserModel,
  findUserModel,
  updatePassword,
  updateName,
  updatePicture,
} = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/db/user");

exports.createUserController = async (name, fathername, nic, password, email, phone, city, course_name, batch) => {
  try {
    const hashPass = await bcrypt.hash(password, 12);
    return await createUserModel(name, fathername, nic, email, phone, city, course_name, batch, hashPass);
  } catch (err) {
    throw err
  }
};

exports.loginController = async (email, password) => {
  try {
    const user = await findUserModel(email);
    if (!user) {
      throw "Wrong Email!";
    }


    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw "Wrong Password!";
    }

    let attest = user.attest;
    if (attest != "verified") {
      throw attest
    }

    let userId = user._id;
    let role = user.role;

    let token = jwt.sign({ userId, email, role }, process.env.SECRET_KEY, {
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
