const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const courseSchema = new Schema({
    course_name: {
        type: String, unique: [true, "Course already exists!"], required: [true, "NIC is required."],
        validate: {
            validator: async function (course_name) {
                const existingCourse = await this.constructor.findOne({ course_name });
                return !existingCourse;
            },
            message: "Course already exists!"
        }
    },
    batch: { type: String, required: [true, "Course batch is required."] },
    cities: [{
        type: String, required: [true, "City required."],
    }],
});
// const courseSchema = new Schema({
//     _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
//     course_name: { type: String, required: true },
//     questions: [{ type: Types.ObjectId, ref: 'Question' }],
//     quizOpen: { type: Boolean, default: false },
//  // New field 
// });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
