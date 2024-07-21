const express = require("express")
const { studentRequestsController } = require("../controllers/admin")

const router = express.Router()


router.get("/studentRequests", async (req, res) => {
    try {
        console.log("🚀 ~ router.get ~ studentRequests:", "studentRequests")
        const resp = await studentRequestsController()
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router