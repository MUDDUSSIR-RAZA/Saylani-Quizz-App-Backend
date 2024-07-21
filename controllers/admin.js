const express = require(`express`);
const { getStudentRequestModel, attestStudentRequestModel } = require("../model/admin");

exports.getStudentRequestsController = async () => {
    try {
        const resp = await getStudentRequestModel();
        return resp
    } catch (error) {
        throw err;
    }
}

exports.attestStudentRequestController = async (id , status) => {
    try {
        const resp = await attestStudentRequestModel(id , status);
        return "resp";
    } catch (error) {
        throw error;
    }
}