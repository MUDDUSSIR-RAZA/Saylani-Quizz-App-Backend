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
        type: String, required: [true, "NIC is required."],
        validate: {
            validator: function (array) {
                return array.every(city => typeof city === 'string');
            },
            message: 'Each city must be a string.'
        }
    }],
});
// const courseSchema = new Schema({
//     _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
//     course_name: { type: String, required: true },
//     questions: [{ type: Types.ObjectId, ref: 'Question' }],
//     quizOpen: { type: Boolean, default: false },
//  // New field 
// });

const course = mongoose.model('Course', courseSchema);

module.exports = course;
