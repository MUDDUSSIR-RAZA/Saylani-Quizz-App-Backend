const { getStudentQuizModel } = require('../model/student');

jwt = require('jsonwebtoken');

exports.getStudentQuizController = async (token) => {
    try {
        const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
        const resp = getStudentQuizModel(userId)
        return resp
    } catch (error) {
        throw error
    }
}

exports.getQuizByIdController = async (token, quizId) => {
    try {
        const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(userId , quizId)
        // const resp = getStudentQuizModel(userId)
        return "resp"
    } catch (error) {
        throw error
    }
}