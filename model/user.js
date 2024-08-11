const User = require("../model/db/user");
const Admin = require("./db/admin");

exports.createUserModel = async (name, fathername, nic, email, phone, city, course_name, batch, password) => {
  try {
    const existingUser = await User.findOne({ nic });

    if (existingUser) {
      const existingCourse = existingUser.courses.find(course =>
        course.course_name === course_name &&
        course.batch === batch
      );

      if (existingCourse) {
        throw (`User is already applied for this Course.`);
      }

      if (!existingCourse) {
        const anOtherCourse = existingUser.courses.find(course =>
          (course.status === 'pending' || course.status === 'enrolled')
        );

        if (anOtherCourse) {
          throw (`User is already ${anOtherCourse.status} in Another course.`);
        }
      }
      existingUser.courses.push({ course_name, batch, city });
      await existingUser.save();
      return "Applied For Course.";

    } else {
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
        return "Request sent for approval!";
      } catch (error) {
        if (error.name === 'ValidationError') {
          // Iterate through each field error
          for (let field in error.errors) {
            throw (error.errors[field].message);
          }
        } else if (error.code === 11000) {
          throw ('Email already exists!');
        } else {
          throw ('An unknown error occurred: ' + error);
        }
      }
    }
  } catch (err) {
    throw err;
  }
};

exports.createAdminModel = async (name, email, password, phone) => {
  try {
    const existingAllAdmins = await Admin.find();

    const existingAdmin = await Admin.findOne({ email });
    const existingUser = await User.findOne({ email });

    if (existingAdmin || existingUser) {
      throw (`Email Already existed`);

    } else {
      const admin = new Admin({
        name,
        email,
        phone,
        password,
        ...(existingAllAdmins.length === 0 ? { isVerified: 'verified' } : {})
      });

      try {
        await admin.save();
        return "Request sent for approval!";
      } catch (error) {
        if (error.name === 'ValidationError') {
          for (let field in error.errors) {
            throw (error.errors[field].message);
          }
        } else if (error.code === 11000) {
          throw ('Eemail already exists!');
        } else {
          throw ('An unknown error occurred: ' + error);
        }
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

exports.findUserModel = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
};

exports.findAdminModel = async (email) => {
  try {
    const result = await Admin.findOne({ email });
    return result
  } catch (err) {
    throw err;
  }
};