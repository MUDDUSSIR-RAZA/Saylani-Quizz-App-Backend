const { getStudentQuizModel, getQuizByIdModel, getProfileModel, submitResultModel } = require('../model/student');

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
        const resp = await getQuizByIdModel(userId , quizId)
        return resp
    } catch (error) {
        throw error
    }
}

exports.getProfileController = async (token) => {
    try {
        const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
        const resp = getProfileModel(userId)
        return resp
    } catch (error) {
        throw error
    }
}

exports.submitResultController = async ( userId, course_name , batch , quiz_name , totalQuestions , score ) => {
    try {
        const resp = await submitResultModel( userId, course_name , batch , quiz_name , totalQuestions , score )
        return resp
    } catch (error) {
        throw error
    }
}