const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Question schema
const questionSchema = new Schema({
    quizId:{ type: Schema.Types.ObjectId, ref: "Quiz"},
    question_text: { type: String, required: [true, "Question required."] },
    options: { type: [String],  required: [true, "Options required."] },
    correct_answer: { type: String,  required: [true, "Correct Answer required."] },
    time_limit: { type: Number,  required: [true, "Time required."] },
});

// Create models from the schemas
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
