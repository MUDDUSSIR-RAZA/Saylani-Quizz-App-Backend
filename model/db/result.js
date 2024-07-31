const { Schema, default: mongoose } = require("mongoose");

const resultSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    course_name: { type: String, required: [true, "Course name is required."] },
    quiz_name: { type: String, required: [true, "Course name is required."] },
    batch: { type: String, required: [true, "Course batch is required."] },
    totalQuestions: { type: Number, required: [true, "Total Question is required."] },
    score: { type: Number, required: [true, "Score is required."] },
    date: { type: Date, default: Date.now, },
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result