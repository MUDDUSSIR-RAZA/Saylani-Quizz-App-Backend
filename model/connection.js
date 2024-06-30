const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/SampleApp";


exports.mongoose = async () => {
  try {
    let connect = await mongoose.connect(url);
    console.log("connected");
  } catch (err) {
    throw err;
  }
};
