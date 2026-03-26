import { eq } from "drizzle-orm"
import { db } from "../config/drizzle.js"
import { campaign } from "../db/schema/campaign.js"
import { campaign_spend_log } from "../db/schema/campaign_spend_log.js"
import cron from 'node-cron'

const simulateDailySpend = async () => {
    // get all active campaigns
    const activeCampaigns = await db.select().from(campaign).where(eq(campaign.status, "active"))

    for(const c of activeCampaigns) {
        let dailyBudget

        if(c.budget_type === "daily") {
            dailyBudget = c.budget_amount
        } else {
            // lifetime — divide evenly across campaign duration
            const start = c.start_date
            const end = c.end_date
            //@ts-ignore
            const totalDays = Math.ceil((end?.getTime()- start?.getTime()) / (1000 * 60 * 60 * 24))
            dailyBudget = c.budget_amount! / totalDays
        }

        // randomize between 60–100% of daily budget (realistic simulation)
        const todaySpend = parseFloat(
            (dailyBudget! * (0.6 + Math.random() * 0.4)).toFixed(2)
        )

        const newAmountSpent = (c.amount_spent ?? 0) + todaySpend

        // insert spend log
        await db.insert(campaign_spend_log).values({
            campaign_id: c.id,
            date: new Date().toISOString().split('T')[0],
            amount_spent: todaySpend
        })

        // update campaign — and auto-complete if budget exhausted
        const isExhausted = newAmountSpent >= c.budget_amount!

        await db.update(campaign)
            .set({
                amount_spent: newAmountSpent,
                status: isExhausted ? "completed" : "active"
            })
            .where(eq(campaign.id, c.id))

        if (isExhausted) {
            console.log(`Campaign ${c.id} completed — budget exhausted`)
        }

    }
    console.log(`Spend simulation ran for ${activeCampaigns.length} campaigns`)
}

// every day at midnight in prod
export const startSpendSimulator = () => {
    cron.schedule('0 0 * * *', simulateDailySpend)
    console.log('Spend simulator cron job started')
}