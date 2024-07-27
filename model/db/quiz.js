const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  course_name: { type: String, required: [true, "Course name is required."] },
  quiz_name: { type: String, required: [true, "Course name is required."] },
  displayQuestions: {
    type: String,
    required: [true, "Phone number is required."],
    default: "10",
  },
  quizOpen: { type: Boolean, default: false },
  key: { type: String, required: [true, "Please enter a password."] },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;