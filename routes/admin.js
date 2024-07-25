const express = require("express")
const { getStudentRequestsController, attestStudentRequestController, addCourseController, getCoursesController } = require("../controllers/admin")

const router = express.Router()


router.get("/getStudentRequests", async (req, res) => {
    try {
        const resp = await getStudentRequestsController()
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.post("/attestStudentRequest", async (req, res) => {
    try {
        const resp = await attestStudentRequestController(req.body.id, req.body.status)
        res.status(200).json(resp)
    } catch (error) {
        throw error;
    }
})

router.post("/addCourse", async (req, res) => {
    try {
        const resp = await addCourseController(req.body.course_name, req.body.batch, req.body.cities)
        return res.status(200).json(resp)
    } catch (error) {
        console.log("🚀 ~ router.post ~ error:", error)
        throw error
    }
})

router.get("/getCourses", async (req, res) => {
    try {
        const resp = await getCoursesController()
        res.status(200).json(resp)
    } catch (err) {
        console.log("🚀 ~ router.get ~ err:", err)
        res.status(404).json(err)
    }
})

module.exports = router