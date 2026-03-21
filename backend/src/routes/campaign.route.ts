import express from "express"
import verifyUser from "../middleware/auth"

const campaignRouter = express.Router()

campaignRouter.use(verifyUser)

campaignRouter.post("/create", async (req, res) => {
    try {
        const body = req.body
    } catch (error) {
        
    }
})

export default campaignRouter