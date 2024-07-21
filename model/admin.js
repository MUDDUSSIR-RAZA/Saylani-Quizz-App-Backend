const User = require("./db/user");

exports.studentRequestModel = async () => {
    try {
        const studentRequests = await User.find({ attest: "pending" }).select("-password")
        return studentRequests;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving student requests');
    }
};