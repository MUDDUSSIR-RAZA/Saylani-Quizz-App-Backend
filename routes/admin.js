const express = require("express")
const { getStudentRequestsController, attestStudentRequestController, addCourseController, getCoursesController, addQuizController, addQuestionController, getAllQuizzesController, getQuizByIdController, editQuizController, addBulkQuestionsController, deleteQuizController } = require("../controllers/admin")

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
        res.status(404).json(err)
    }
})

router.post("/addCourse", async (req, res) => {
    try {
        const resp = await addCourseController(req.body.course_name, req.body.batch, req.body.cities);
        return res.status(200).json(resp);
    } catch (error) {
        if (error === "Course already exists!") {
            return res.status(400).json(error);
        } else if (error.includes("required")) {
            return res.status(400).json(error);
        } else {
            return res.status(500).json(error);
        }
    }
});

router.get("/getCourses", async (req, res) => {
    try {
        const resp = await getCoursesController()
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.post("/addQuiz", async (req, res) => {
    try {
        const resp = await addQuizController(req.body.course_name, req.body.course_id, req.body.quiz_name);
        return res.status(200).json(resp);
    } catch (error) {
        res.status(404).json(error)
    }
});

router.get("/getAllQuizzes", async (req, res) => {
    try {
        const resp = await getAllQuizzesController()
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.get("/getQuizById", async (req, res) => {
    try {
        const id = req.query.id;
        const resp = await getQuizByIdController(id)
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.patch("/editQuiz", async (req, res) => {
    try {
        const resp = await editQuizController(req.body._id, req.body.quiz_name, req.body.displayQuestions , req.body.quizOpen);
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.post("/deleteQuiz", async (req, res) => {
    try {
      const resp = await deleteQuizController(req.body._id);
      res.status(200).json(resp);
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  });

router.post("/addQuestion", async (req, res) => {
    try {
        const resp = await addQuestionController(req.body.quizId, req.body.question_text, req.body.options, req.body.correctAnswer, req.body.time_limit);
        return res.status(200).json(resp);
    } catch (error) {
        res.status(404).json(error)
    }
});

router.post("/addBulkQuestions", async (req, res) => {
    try {
        const resp = await addBulkQuestionsController(req.body.selectedCourse, req.body.questions);
        return res.status(200).json(resp);
    } catch (error) {
        res.status(404).json(error)
    }
});

module.exports = router