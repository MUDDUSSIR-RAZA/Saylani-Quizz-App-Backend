const { Router } = require("express");
const { getStudentQuizController } = require("../controllers/student");

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



module.exports = router