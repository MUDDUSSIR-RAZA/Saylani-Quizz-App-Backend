const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: [true, "First name is required."] },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: async function (email) {
        const existingUser = await this.constructor.findOne({ email });
        return !existingUser;
      },
      message: "Email already exists!",
    },
  },
  password: { type: String, required:  [true, "Please Enter a Password."] }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
