import express from "express"
import verifyAdmin from "../middleware/admin"
import { errorResponse, successResponse } from "../utils/apiResponse"
import { db } from "../config/drizzle"
import { pages } from "../db/schema"
import { eq } from "drizzle-orm"

const pageAdminRouter = express.Router()

pageAdminRouter.use(verifyAdmin)

// get all pages
pageAdminRouter.get("/pages", async (req, res) => {
    try {
        const allPages = await db.query.pages.findMany()

        return successResponse(res, allPages)
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Can't get pages")
    }
})

// verify a page
pageAdminRouter.put("/:id", async (req, res) => {
    try {
        const {id} = req.params

        await db.update(pages)
            .set({is_verified: true})
            .where(eq(pages.id, id))

        return successResponse(res, "Page is now verified")
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Can't verify page")
    }
})

export default pageAdminRouter