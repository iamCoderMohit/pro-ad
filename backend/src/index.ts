import express from "express"
import authRouter from "./routes/auth.route"
import pageRouter from "./routes/page.route"
import cookieParser from "cookie-parser"
import pageAdminRouter from "./routes/page.admin.route"
import campaignRouter from "./routes/campaign.route"

export const app = express()
app.use(cookieParser())

app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/page", pageRouter)
app.use("/api/v1/campaign", campaignRouter)

app.use("/api/v1/page/admin", pageAdminRouter)