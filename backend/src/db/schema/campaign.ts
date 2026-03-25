import { doublePrecision, pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { pages } from "./page.js";
import { users } from "./user.js";

export const statusEnum = pgEnum("status", ["cancelled", "completed", "paused", "draft", "active"])

export const campaign = pgTable("campaigns", {
    id: uuid("id").defaultRandom().primaryKey(),
    page_id: uuid("page_id").references(() => pages.id, {onDelete: 'cascade'}),
    user_id: uuid("user_id").references(() => users.id),
    name: text("name"),
    objective: text("objective"),
    budget_type: text("budget_type"),
    budget_amount: doublePrecision("budget_amount"),
    start_date: timestamp("start_date").defaultNow(),
    end_date: timestamp("end_date"),
    status: statusEnum("status").default("draft"),
    amount_spent: doublePrecision("amount_spent").default(0),
    remaining_budget: doublePrecision("remaining_budget"),
    created_at: timestamp("created_at").defaultNow()
})