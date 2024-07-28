const Course = require("./db/course");
const Question = require("./db/question");
const Quiz = require("./db/quiz");
const User = require("./db/user");

exports.getStudentQuizModel = async (userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User not found');
        }
        const enrolledCourses = user.courses.filter(course => course.status === 'enrolled');

        if (enrolledCourses.length === 0) {
            throw new Error('User is not enrolled in any courses');
        }

        const quizzesWithMoreThan10Questions = [];

        for (const course of enrolledCourses) {
            const quizzes = await Quiz.find({
                course_name: course.course_name,
                quizOpen: true,
                $expr: { $gte: [{ $size: "$questions" }, 10] }
            }).populate('questions');
            console.log("first quizzes" , quizzes)

            quizzes.forEach(quiz => {
                quizzesWithMoreThan10Questions.push({
                    userId: user._id,
                    quizId: quiz._id,
                    quizName: quiz.quiz_name,
                    questionsCount: quiz.questions.length
                });
            });
        }
        console.log(quizzesWithMoreThan10Questions)

        return "quizzesWithMoreThan10Questions";
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}