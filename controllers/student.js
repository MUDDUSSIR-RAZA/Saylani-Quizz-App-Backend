jwt = require('jsonwebtoken');

exports.getStudentQuizController = async (token) => {
    try {
        var decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded) // bar
        return token
    } catch (error) {
        throw error
    }
}