const { Router } = require("express");
const { getStudentQuizController, getQuizByIdController, getProfileController, submitResultController, getOverallPerformanceController } = require("../controllers/student");

const router = Router()

router.get("/getStudentQuiz", async (req, res) => {
    try {
        const token = req.query.token;
        const resp = await getStudentQuizController(token)
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.get("/getQuizById", async (req, res) => {
    try {
        const token = req.query.token;
        const quizId = req.query.quizId;
        const resp = await getQuizByIdController(token, quizId)
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.get("/getProfile", async (req, res) => {
    try {
        const token = req.query.token;
        const resp = await getProfileController(token)
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.post("/submitResult", async (req, res) => {
    try {
        const resp = await submitResultController(
            req.body.userId,
            req.body.course_name,
            req.body.batch,
            req.body.quiz_name,
            req.body.totalQuestions,
            req.body.score
        );
        res.status(200).json(resp);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get("/getOverallPerformance", async (req, res) => {
    try {
        const token = req.query.token;
        const resp = await getOverallPerformanceController(token)
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router