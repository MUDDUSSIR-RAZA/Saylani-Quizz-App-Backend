const User = require("../model/db/user");

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
      console.log("Course added to existing user.")
      existingUser.courses.push({ course_name, batch, city });
      await existingUser.save();
      return "Course added to existing user.";

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
        console.log(error)
        if (error.name === 'ValidationError') {
          for (field in error.errors) {
            throw new Error(error.errors[field].message);
          }
        } else if (error.code === 11000) {
          throw new Error('NIC or email already exists!');
        } else {
          throw new Error('An unknown error occurred: ' + error);
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