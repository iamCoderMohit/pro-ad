import z, { date, float32, string } from "zod"

export const Campaign = z.object({
    page_id: string(),
    name: string(),
    objective: string(),
    budget_type: string(),
    budget_amount: float32(),
    end_date: date()
})