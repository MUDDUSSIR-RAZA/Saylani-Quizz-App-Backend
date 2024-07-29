const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: { type: String, required: [true, "Course name is required."] },
    batch: { type: String, required: [true, "Batch is required."] },
    city: { type: String, required: [true, "City is required."] },
    // roll_no: { type: Number, required: [true, "Roll number is required."] },
    status: { type: String, enum: ['pending', 'enrolled', 'failed', "completed", "canceled"], default: 'pending', required: [true, "Status is required."] }
});


const userSchema = new Schema({
    name: { type: String, required: [true, "Name is required."] },
    fathername: { type: String, required: [true, "Father's name is required."] },
    nic: {
        type: String, unique: [true, "NIC already exists!"], required: [true, "NIC is required."],
    },
    password: { type: String, required: [true, "Please enter a password."] },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required."],
    },
    attest: { type: String, enum: ['pending', 'verified', 'Unverified'], default: 'pending', required: [true, "Status is required."] },
    phone: { type: String, required: [true, "Phone number is required."] },
    courses: [courseSchema],
    role: { type: String, default: 'student' },
    // results: [{ type: Types.ObjectId, ref: 'Result' }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;