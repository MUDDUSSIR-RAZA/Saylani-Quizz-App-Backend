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

        const filterQuizzes= [];

        for (const course of enrolledCourses) {
            const quizzes = await Quiz.find({
                course_name: course.course_name,
                quizOpen: true,
                $expr: { $gte: [{ $size: "$questions" }, 10] }
            }).populate('questions');

            quizzes.forEach(quiz => {
                filterQuizzes.push(quiz);
            });
        }

        const resp = {
            userId: user._id,
            quiz: filterQuizzes
        }

        return resp;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}