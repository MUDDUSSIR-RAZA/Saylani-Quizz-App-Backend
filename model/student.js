const Quiz = require("./db/quiz");
const Result = require("./db/result");
const User = require("./db/user");

exports.getStudentQuizModel = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw ('User not found');
        }
        const enrolledCourses = user.courses.filter(course => course.status === 'enrolled');

        if (enrolledCourses.length === 0) {
            throw ('User is not enrolled in any courses');
        }

        const filterQuizzes = [];

        for (const course of enrolledCourses) {
            const quizzes = await Quiz.find({
                course_name: course.course_name,
                quizOpen: true,
                $expr: { $gte: [{ $size: "$questions" }, 10] }
            }).populate({
                path: "course",
                select: "batch"
            });


            for (const quiz of quizzes) {
                const quizAttempted = await Result.findOne({ userId, course_name: quiz.course_name, batch: quiz.course.batch, quiz_name: quiz.quiz_name });
                if (!quizAttempted) {
                    filterQuizzes.push(quiz);
                }
            }
        }

        return filterQuizzes;
    } catch (error) {
        throw error.message
    }
}

exports.getQuizByIdModel = async (userId, quizId) => {
    try {
        // Verify the user ID
        const user = await User.findById(userId);
        if (!user) {
            throw ("User not found")
        }

        // Find the quiz by ID and populate the course and questions
        const quiz = await Quiz.findById(quizId).populate("questions").populate({
            path: "course",
            select: "batch"
        });
        if (!quiz) {
            throw ("Quiz not found")
        }

        // Check if the user is enrolled in the course associated with the quiz
        const isEnrolled = user.courses.some(
            (course) => course.course_name === quiz.course_name && course.status === "enrolled"
        );
        if (!isEnrolled) {
            throw ("User is not enrolled in the course for this quiz")
        }


        const getResult = await Result.findOne({ userId, course_name: quiz.course_name, batch: quiz.course.batch, quiz_name: quiz.quiz_name });
        if (getResult) {
            throw ('Result already submitted for this Quiz!');
        }
        console.log(quiz.course_name, quiz.course.batch, quiz.quiz_name)

        // Check if the quiz is open
        if (!quiz.quizOpen) {
            throw ("Quiz is not open")
        }

        // Get the number of questions to display
        const numQuestionsToDisplay = parseInt(quiz.displayQuestions, 10);

        // Randomly select the specified number of questions
        const shuffledQuestions = quiz.questions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, numQuestionsToDisplay);

        // Return the quiz object with the selected questions
        return {
            ...quiz.toObject(),
            questions: selectedQuestions,
            userId
        }
    } catch (error) {
        throw error
    }
}

exports.getProfileModel = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password")
        if (!user) {
            throw ('User not found');
        }

        return user;
    } catch (error) {
        throw error.message
    }
}

exports.submitResultModel = async (userId, course_name, batch, quiz_name, totalQuestions, score) => {
    try {
        const getResult = await Result.findOne({ userId, course_name, batch, quiz_name });

        if (getResult) {
            throw ('Result already submitted for this Quiz!');
        }

        const result = new Result({
            userId, course_name, batch, quiz_name, totalQuestions, score
        });

        try {
            await result.save();

            await User.findByIdAndUpdate(userId, {
                $push: {
                    results: result._id
                }
            })
            return "Quiz Submitted!";
        } catch (error) {
            throw new Error('Error saving the result');
        }
    } catch (error) {
        throw error;
    }
};

exports.getOverallPerformanceModel = async (userId) => {
    try {
        const result = await Result.find({userId})
        return result;
    } catch (error) {
        throw error.message
    }
}