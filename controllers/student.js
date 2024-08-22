const { getStudentQuizModel, getQuizByIdModel, getProfileModel, submitResultModel, getOverallPerformanceModel } = require('../model/student');

jwt = require('jsonwebtoken');

exports.getStudentQuizController = async (userId) => {
    try {
        const resp = getStudentQuizModel(userId)
        return resp
    } catch (error) {
        throw error
    }
}

exports.getQuizByIdController = async (userId, quizId) => {
    try {
        const resp = await getQuizByIdModel(userId , quizId)
        return resp
    } catch (error) {
        throw error
    }
}

exports.getProfileController = async (userId) => {
    try {
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

exports.getOverallPerformanceController = async (userId) => {
    try {
        const resp = getOverallPerformanceModel(userId)
        return resp
    } catch (error) {
        throw error
    }
}