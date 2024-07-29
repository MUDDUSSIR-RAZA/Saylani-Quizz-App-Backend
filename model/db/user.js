const mongoose = require("mongoose");
const Counter = require("./counter");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: { type: String, required: [true, "Course name is required."] },
    batch: { type: String, required: [true, "Batch is required."] },
    city: { type: String, required: [true, "City is required."] },
    roll_no: { type: Number },
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


async function getNextSequenceValue(sequenceName) {
    console.log("sdfsdfsf")
    const sequenceDocument = await Counter.findOneAndUpdate(
        { name: sequenceName },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.sequence_value;
}
    

userSchema.pre('save', async function (next) {
    console.log("dsfdsfdsfds")
    if (this.isNew || this.isModified('courses')) {
        for (let course of this.courses) {
            if (!course.roll_no) {
                course.roll_no = await getNextSequenceValue("roll_number");
            }
        }
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;