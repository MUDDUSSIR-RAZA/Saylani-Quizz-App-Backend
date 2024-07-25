const course = require("./db/course");
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
        console.log("🚀 ~ exports.attestStudentRequestModel= ~ result:", result)
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
        const course = new course({
            course_name, batch, cities
        })
        try {
            await course.save();
            return "Course Created!";
        } catch (error) {
            if (error.name === 'ValidationError') {
                for (field in error.errors) {
                    throw (error.errors[field].message);
                }
            }
            // Check for duplicate key error
            else if (error.code === 11000) {
                throw ('NIC already exists!');
            } else {
                throw ('An unknown error occurred:', error);
            }

        }
    } catch (error) {
        throw error
    }
}