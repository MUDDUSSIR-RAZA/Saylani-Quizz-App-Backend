const express = require(`express`);
const { getStudentRequestModel, attestStudentRequestModel, addCourseModel, getCoursesModel, addQuizModel, getQuizzesModel } = require("../model/admin");

exports.getStudentRequestsController = async () => {
    try {
        const resp = await getStudentRequestModel();
        return resp
    } catch (error) {
        throw err;
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
        console.log("🚀 ~ exports.addCourseController= ~ error:", error)
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

exports.addQuizController = async (course_name, quiz_name, key) => {
    try {
        const resp = await addQuizModel(course_name, quiz_name, key)
        return resp
    } catch (error) {
        console.log("🚀 ~ exports.addCourseController= ~ error:", error)
        throw error
    }
}


exports.getQuizzesController = async () => {
    try {
        const resp = await getQuizzesModel();
        return resp
    } catch (error) {
        throw err;
    }
}