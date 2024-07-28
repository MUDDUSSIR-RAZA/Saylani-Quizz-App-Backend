const { getStudentQuizModel, getQuizByIdModel } = require('../model/student');

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
        const resp = getQuizByIdModel(userId , quizId)
        return resp
    } catch (error) {
        throw error
    }
}