const { getStudentRequestModel, attestStudentRequestModel, addCourseModel, getCoursesModel, addQuizModel, addQuestionModel, getAllQuizzesModel, getQuizByIdModel, editQuizModel, addBulkQuestionsModel } = require("../model/admin");

exports.getStudentRequestsController = async () => {
    try {
        const resp = await getStudentRequestModel();
        return resp
    } catch (error) {
        throw error;
    }
}

exports.attestStudentRequestController = async (id, status) => {
    try {
        const resp = await attestStudentRequestModel(id, status);
        return resp;
    } catch (error) {
        throw error;
    }
}

exports.addCourseController = async (course_name, batch, cities) => {
    try {
        const resp = await addCourseModel(course_name, batch, cities)
        return resp
    } catch (error) {
        throw error
    }
}

exports.getCoursesController = async () => {
    try {
        const resp = await getCoursesModel();
        return resp
    } catch (error) {
        throw err;
    }
}

exports.addQuizController = async (course_name, course_id, quiz_name) => {
    try {
        const resp = await addQuizModel(course_name, quiz_name, course_id)
        return resp
    } catch (error) {
        throw error
    }
}


exports.getAllQuizzesController = async () => {
    try {
        const resp = await getAllQuizzesModel();
        return resp
    } catch (error) {
        throw error;
    }
}

exports.getQuizByIdController = async (id) => {
    try {
        const resp = await getQuizByIdModel(id);
        return resp
    } catch (error) {
        throw error;
    }
}

exports.editQuizController = async ( _id, quiz_name, displayQuestions ,quizOpen) => {
    try {
        console.log(quizOpen)
        const resp = await editQuizModel( _id, quiz_name, displayQuestions, quizOpen)
        return resp
    } catch (error) {
        throw error
    }
}

exports.addQuestionController = async (quizId, question_text, options, correctAnswer, time_limit) => {
    try {
        const resp = await addQuestionModel(quizId, question_text, options, correctAnswer, time_limit)
        return resp
    } catch (error) {
        throw error
    }
}

exports.addBulkQuestionsController = async (quizId, questions) => {
    try {
        const resp = await addBulkQuestionsModel(quizId, questions)
        return resp
    } catch (error) {
        throw error
    }
}