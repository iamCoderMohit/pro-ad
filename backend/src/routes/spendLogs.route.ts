import express from "express"
import { db } from "../config/drizzle"
import { campaign_spend_log } from "../db/schema/campaign_spend_log"
import { desc, eq } from "drizzle-orm"
import { errorResponse, successResponse } from "../utils/apiResponse"
import verifyUser from "../middleware/auth"
import { campaign } from "../db/schema"

const spendRouter = express.Router()

spendRouter.use(verifyUser)

// all daily spend logs for a campaign
spendRouter.get("/:id/spend-logs", async (req, res) => {
    try {
        const logs = await db.select()
                    .from(campaign_spend_log)
                    .where(eq(campaign_spend_log.id, req.params.id))
                    .orderBy(desc(campaign_spend_log.date))

        return successResponse(res, logs)
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Failed to fetch spend logs")
    }
})

// get budget summary for a campaign
spendRouter.get("/:id/analytics", async (req, res) => {
    try {
        const [c] = await db
                    .select()
                    .from(campaign)
                    .where(eq(campaign.id, req.params.id))
        
        if(!c) {
            return errorResponse(res, "Campaign not found")
        }

        const logs = await db
            .select()
            .from(campaign_spend_log)
            .where(eq(campaign_spend_log.campaign_id, req.params.id))

        const daysActive = logs.length
        const totalSpent = c.amount_spent ?? 0
        const remaining = c.budget_amount! - totalSpent
        const percentUsed = parseFloat(((totalSpent / c.budget_amount!) * 100).toFixed(2))
        const avgDailySpend = daysActive > 0
            ? parseFloat((totalSpent / daysActive).toFixed(2))
            : 0
        const start = c.start_date
        const end = c.end_date
        const totalDays = Math.ceil((end?.getTime()! - start?.getTime()!) / (1000 * 60 * 60 * 24))
        const daysRemaining = totalDays - daysActive

        return successResponse(res, {
            campaign_id: c.id,
            total_budget: c.budget_amount,
            amount_spent: totalSpent,
            remaining,
            percent_used: percentUsed,
            days_active: daysActive,
            days_remaining: daysRemaining,
            avg_daily_spend: avgDailySpend
        })
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Failed to fetch analytics")
    }
})

export default spendRouter