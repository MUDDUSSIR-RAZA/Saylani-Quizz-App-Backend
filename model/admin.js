const Course = require("./db/course");
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

exports.addQuizModel = async (course_name, quiz_name, key) => {
    try {
        const quiz = new Quiz({ course_name, quiz_name, key });
        const isQuiz = await Quiz.find({ quiz_name })
        const isCourse = await Quiz.find({ course_name })
        try {
            if(isQuiz.length > 0 && isCourse.length > 0) {
                throw ('Quiz existed!');
            }
            await quiz.save();
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

exports.getQuizzesModel = async () => {
    try {
        const getQuizzes = await Quiz.find()
        return getQuizzes;
    } catch (error) {
        throw ('Error retrieving student requests');
    }
};
