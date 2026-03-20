import { doublePrecision, pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { pages } from "./page";

export const campaign = pgTable("campaigns", {
    id: uuid("id").primaryKey(),
    page_id: uuid("page_id").references(() => pages.id),
    name: text("name"),
    objective: text("objective"),
    budget_type: text("budget_type"),
    budget_amount: doublePrecision("budget_amount"),
    start_date: timestamp("start_date").defaultNow(),
    end_date: timestamp("end_date"),
    status: text("status"),
    created_at: timestamp("created_at").defaultNow()
})