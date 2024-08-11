const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/SMITQuizApp";


exports.mongoose = async () => {
  try {
    let connect = await mongoose.connect(url);
    // let connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected");
  } catch (err) {
    console.log(err)
    throw err;
  }
};
