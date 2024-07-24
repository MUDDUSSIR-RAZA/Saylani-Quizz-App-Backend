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