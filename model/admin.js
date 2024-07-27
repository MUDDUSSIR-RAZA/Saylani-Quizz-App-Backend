const Course = require("./db/course");
const Question = require("./db/question");
const Quiz = require("./db/quiz");
const User = require("./db/user");

exports.getStudentRequestModel = async () => {
    try {
        const getStudentRequests = await User.find({ attest: "pending" }).select("-password")
        return getStudentRequests;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving student requests');
    }
};

exports.attestStudentRequestModel = async (id, status) => {
    try {
        const attest = {
            attest: status
        }
        const result = await User.findOneAndUpdate({ _id: id }, attest, { new: true });
        if (!result) {
            throw "Student not Found!";
        }
        return `${result.name} is ${status}`;
    } catch (error) {
        throw error
    }
}

exports.addCourseModel = async (course_name, batch, cities) => {
    try {
        const course = new Course({ course_name, batch, cities });

        try {
            await course.save();
            return "Course Created!";
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log("🚀 ~ exports.addCourseModel= ~ ValidationError:", "ValidationError")
                // Iterate through each field error
                for (let field in error.errors) {
                    console.log("🚀 ~ exports.addCourseModel= ~ error.errors[field].message:", error.errors[field].message)
                    throw (error.errors[field].message);
                }
            }
            // Check for duplicate key error
            else if (error.code === 11000) {
                console.log("🚀 ~ exports.addCourseModel= ~ Course already exists!:", "Course already exists!")
                throw ('Course already exists!');
            } else {
                throw ('An unknown error occurred:', error);
            }
        }
    } catch (error) {
        // Log the error and rethrow it to be handled by the caller
        console.error("Error in addCourseModel:", error);
        throw error;
    }
};


exports.getCoursesModel = async () => {
    try {
        const getCourses = await Course.find()
        return getCourses;
    } catch (error) {
        console.log("🚀 ~ exports.getCoursesModel= ~ error:", error)
        throw ('Error retrieving student requests');
    }
};

exports.addQuizModel = async (course_name, quiz_name, key, course_id) => {
    try {
        console.log(course_id);
        const isQuiz = await Quiz.find({ quiz_name })
        const isCourse = await Quiz.find({ course_name })
        try {
            if (isQuiz.length > 0 && isCourse.length > 0) {
                throw ('Quiz existed!');
            }
            const quiz = new Quiz({ course_name, quiz_name, key, course: course_id });
            await quiz.save();
            const course = await Course.findByIdAndUpdate(course_id, {
                $push: { quizzes: quiz._id },
            });
            return "Quiz Created!";
        } catch (error) {
            if (error.name === 'ValidationError') {
                for (let field in error.errors) {
                    throw (error.errors[field].message);
                }
            } else {
                throw ('An unknown error occurred:', error);
            }
        }
    } catch (error) {
        console.error("Error in addCourseModel:", error);
        throw error;
    }
};

exports.getAllQuizzesModel = async () => {
    try {
        const getQuizzes = await Quiz.find()
        return getQuizzes;
    } catch (error) {
        throw ('Error retrieving student requests');
    }
};

exports.getQuizByIdModel = async (id) => {
    try {
        const quiz = await Quiz.findOne({ _id: id })
        if (!quiz) {
            throw ('Quiz not found!');
        }
        return quiz;
    } catch (error) {
        throw ('Error retrieving student requests');
    }
};

exports.editQuizModel = async (_id, quiz_name, key, displayQuestions) => {
    try {
        const updatedFields = { quiz_name, key, displayQuestions };

        const result = await Quiz.findOneAndUpdate(
            { _id },
            { $set: updatedFields },
            { new: true }
        );

        if (!result) {
            throw new Error("Quiz not found!");
        }

        return "Quiz Successfully Updated!";
    } catch (err) {
        throw new Error(`Error updating quiz: ${err.message}`);
    }
};


exports.addQuestionModel = async (quizId, question_text, options, correctAnswer, time_limit) => {
    try {
        const isQuiz = await Question.find({ quizId })
        const isQuestion = await Question.find({ question_text })
        try {
            if (isQuestion.length > 0 && isQuiz.length > 0) {
                throw ('Question already existed!');
            }
            const question = new Question({ quiz: quizId, question_text, options, correct_answer: correctAnswer, time_limit });
            await question.save();
            const quiz = await Quiz.findByIdAndUpdate(quizId, {
                $push: { questions: question._id },
            });
            return "Question Created!";
        } catch (error) {
            if (error.name === 'ValidationError') {
                for (let field in error.errors) {
                    throw (error.errors[field].message);
                }
            } else {
                throw ('An unknown error occurred:', error);
            }
        }
    } catch (error) {
        console.error("Error in addCourseModel:", error);
        throw error;
    }
};