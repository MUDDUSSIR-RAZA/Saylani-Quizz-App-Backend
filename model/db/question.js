const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const questionSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    question_text: { type: String, required: true },
    options: { type: [String], required: true },
    correct_option_index: { type: Number, required: true },  // Index of the cor
    time_limit: { type: Number, required: true }
});

const question = mongoose.model('Question', questionSchema);

module.exports = question;
