const User = require("../model/db/user");

exports.createUser = async (userName , email, password) => {
  try {
    const user = new User({
      userName,
      email,
      password
    });
    try {
      await user.save();
    } catch (err) {
      if (err.name === "ValidationError") {
        const fieldName = Object.keys(err.errors)[0];
        const fieldErrorMessage = err.errors[fieldName].message;
        throw fieldErrorMessage;
      } else {
        throw err;
      }
    }
    return "User Successfully SigUp!";
  } catch (err) {
    throw err;
  }
};

exports.updatePassword = async (email , password) => {
  try {
    const userPassword = {
      password
    };
    const result = await User.findOneAndUpdate({ email }, userPassword, { new: true });
    if (!result) {
      throw "User not Found!";
    }
    return "Password Successfully Updated!";
  } catch (err) {
    throw err;
  }
};

exports.updateName = async (email , firstName) => {
  try {
    const name = {
      firstName
    };
    const result = await User.findOneAndUpdate({ email }, name, { new: true });
    if (!result) {
      throw "User not Found!";
    }
    return "Name Successfully Updated!";
  } catch (err) {
    throw err;
  }
};

exports.updatePicture = async (email , picture) => {
  try {
    const pic = {
      picture
    };
    const result = await User.findOneAndUpdate({ email }, pic, { new: true });
    if (!result) {
      throw "User not Found!";
    }
    return "Picture Successfully Updated!";
  } catch (err) {
    throw err;
  }
};

exports.findUser = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
};