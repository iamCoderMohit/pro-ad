import express from "express"
import authRouter from "./routes/auth.route.js"
import pageRouter from "./routes/page.route.js"
import cookieParser from "cookie-parser"
import pageAdminRouter from "./routes/page.admin.route.js"
import campaignRouter from "./routes/campaign.route.js"
import campaignAdminRouter from "./routes/campaign.admin.route.js"
import spendRouter from "./routes/spendLogs.route.js"
import cors from 'cors'

export const app = express()
app.use(cookieParser())

app.use(express.json())

cors({
    origin: 'http://localhost:4200',
    credentials: true
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/page", pageRouter)
app.use("/api/v1/campaign", campaignRouter)
app.use("/api/v1/spend", spendRouter)

app.use("/api/v1/page/admin", pageAdminRouter)
app.use("/api/v1/campaign/admin", campaignAdminRouter)