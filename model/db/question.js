const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Question schema
const questionSchema = new Schema({
    courseId:{ type: Schema.Types.ObjectId, ref: "Course" },
    question_text: { type: String, required: true },
    options: { type: [String], required: true },
    correct_answer: { type: String, required: true },
    time_limit: { type: Number, required: true },
});

// Create models from the schemas
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
