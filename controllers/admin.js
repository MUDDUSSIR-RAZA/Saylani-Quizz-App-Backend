const express = require(`express`)
const { studentRequestModel } = require("../model/admin")

exports.studentRequestsController = async () => {
    try {
        const resp = await studentRequestModel();
        return resp
    } catch (error) {
        throw err;
    }
}