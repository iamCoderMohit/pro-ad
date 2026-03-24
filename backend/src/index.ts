import express from "express"
import authRouter from "./routes/auth.route"
import pageRouter from "./routes/page.route"
import cookieParser from "cookie-parser"
import pageAdminRouter from "./routes/page.admin.route"
import campaignRouter from "./routes/campaign.route"
import campaignAdminRouter from "./routes/campaign.admin.route"
import spendRouter from "./routes/spendLogs.route"
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