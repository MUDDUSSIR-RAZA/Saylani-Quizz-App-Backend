// models/Course.js
const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const courseSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    course_name: { type: String, required: true },
    questions: [{ type: Types.ObjectId, ref: 'Question' }]
});

const course = mongoose.model('Course', courseSchema);

module.exports = course;
