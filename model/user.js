const User = require("../model/db/user");

exports.createUserModel = async (name, fathername, nic, email, phone, city, course_name, batch, password) => {
  try {
    const user = new User({
      name,
      fathername,
      nic,
      email,
      phone,
      password,
      courses: [{
        course_name,
        batch,
        city
      }]
    });
    try {
      await user.save();
      return "Request Send For Approval!";
    } catch (error) {
      console.log("🚀 ~ exports.createUser= ~ error:", error)
      if (error.name === 'ValidationError') {
        for (field in error.errors) {
          throw (error.errors[field].message);
        }
      }
      // Check for duplicate key error
      else if (error.code === 11000) {
        throw ('NIC already exists!');
      } else {
        throw ('An unknown error occurred:', error);
      }
    }
  } catch (err) {
    throw err;
  }
};

exports.updatePassword = async (email, password) => {
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

exports.updateName = async (email, firstName) => {
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

exports.updatePicture = async (email, picture) => {
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

exports.findUserModel = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
};