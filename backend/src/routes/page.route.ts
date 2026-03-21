import express from "express"
import verifyUser from "../middleware/auth"
import { errorResponse, successResponse } from "../utils/apiResponse"
import { Page } from "../zod/page"
import { db } from "../config/drizzle"
import { pages } from "../db/schema"
import { and, eq } from "drizzle-orm"

const pageRouter = express.Router()

pageRouter.use(verifyUser)

pageRouter.post("/create", async (req, res) => {
    try {
        const body = req.body

        const result = Page.safeParse(body)

        console.log(result)

        if(!result.success) {
            return errorResponse(res, "Invalid input")
        }

        const userId = req.user?.id

        await db.insert(pages).values({
            user_id: userId,
            name: body.name,
            category: body.category
        })

        return successResponse(res, "Page created")
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Page not created")
    }    
})

//get my pages
pageRouter.get("/my", async (req, res) => {
    try {
        const userId = req.user?.id

        const myPages = await db.query.pages.findMany({
            where: eq(pages.user_id, userId)
        })

        return successResponse(res, myPages)
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Can't find your pages")
    }
})

//update your page
pageRouter.put("/:id", async (req, res) => {
    try {
        const {name, category} = req.body
        const userId = req.user?.id
        const {id} = req.params

        await db.update(pages)
            .set({name, category})
            // .where()
            .where(and(eq(pages.user_id, userId), eq(pages.id, id)))

        return successResponse(res, "Page updated")
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Can't update page")
    }
})

// delete your page
pageRouter.delete("/:id", async (req, res) => {
    try {
        const userId = req.user?.id
        const {id} = req.params

        await db.delete(pages)
            .where(and(eq(pages.user_id, userId), eq(pages.id, id)))

        return successResponse(res, "Page deleted")
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Can't delete page")
    }
})

export default pageRouter