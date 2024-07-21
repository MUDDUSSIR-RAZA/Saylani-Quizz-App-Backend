const express = require("express")
const {  getStudentRequestsController, attestStudentRequestController } = require("../controllers/admin")

const router = express.Router()


router.get("/getStudentRequests", async (req, res) => {
    try {
        const resp = await getStudentRequestsController()
        res.status(200).json(resp)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.post("/attestStudentRequest" ,async ( req, res ) => {
    try{
        const resp = await attestStudentRequestController(req.body.id, req.body.status)
        res.status(200).json(resp)
    } catch(error) {
        throw error;
    }
})

module.exports = router