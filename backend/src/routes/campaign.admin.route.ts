import express from "express"
import verifyAdmin from "../middleware/admin.js"
import { db } from "../config/drizzle.js"
import { errorResponse, successResponse } from "../utils/apiResponse.js"

const campaignAdminRouter = express.Router()

campaignAdminRouter.use(verifyAdmin)

campaignAdminRouter.get("/", async (req, res) => {
    try {
        const allCamp = await db.query.campaign.findMany()

        return successResponse(res, allCamp)
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Can't get campaings")
    }
})

export default campaignAdminRouter