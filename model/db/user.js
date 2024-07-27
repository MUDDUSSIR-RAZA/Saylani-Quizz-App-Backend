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
        validate: {
            validator: async function (nic) {
                const existingNIC = await this.constructor.findOne({ nic });
                return !existingNIC;
            },
            message: "NIC already exists!"
        }
    },
    password: { type: String, required: [true, "Please enter a password."] },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required."],
        validate: {
            validator: async function (email) {
                const existingUser = await this.constructor.findOne({ email });
                return !existingUser;
            },
            message: "Email already exists!"
        }
    },
    attest: { type: String, enum: ['pending', 'verified', 'Unverified'], default: 'pending', required: [true, "Status is required."] },
    phone: { type: String, required: [true, "Phone number is required."] },
    courses: [courseSchema],
    role: { type: String, default: 'student'},
    // results: [{ type: Types.ObjectId, ref: 'Result' }]
});

// const rollNoCounterSchema = new Schema({
//     last_roll_no: { type: Number, default: 0 }
// });

// userSchema.pre('save', async function (next) {
//     const student = this;
//     if (!student.roll_no) {
//         let counter = await RollNoCounter.findOne();
//         if (!counter) {
//             counter = new RollNoCounter();
//         }
//         counter.last_roll_no += 1;
//         student.roll_no = counter.last_roll_no;
//         await counter.save();
//     }
//     for (let i = 0; i < student.courses.length; i++) {
//         if (!student.courses[i].roll_no) {
//             let counter = await RollNoCounter.findOne();
//             counter.last_roll_no += 1;
//             student.courses[i].roll_no = counter.last_roll_no;
//             await counter.save();
//         }
//     }
//     next();
// });


// const RollNoCounter = mongoose.model('RollNoCounter', rollNoCounterSchema);
const User = mongoose.model("User", userSchema);
module.exports = User;