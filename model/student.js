const Quiz = require("./db/quiz");
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
            }).populate('questions');
            
            quizzes.forEach(quiz => {
                filterQuizzes.push(quiz);
            });
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
        const quiz = await Quiz.findById(quizId).populate("questions");
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
        }
    } catch (error) {
        throw error.message
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