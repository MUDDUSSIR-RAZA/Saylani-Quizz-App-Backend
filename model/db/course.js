const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
    course_name: {
        type: String, unique: [true, "Course already exists!"], required: [true, "Course required."],
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

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
