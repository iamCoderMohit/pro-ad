import { doublePrecision, pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { pages } from "./page";

export const statusEnum = pgEnum("status", ["pause", "resume", "stop"])

export const campaign = pgTable("campaigns", {
    id: uuid("id").defaultRandom().primaryKey(),
    page_id: uuid("page_id").references(() => pages.id),
    name: text("name"),
    objective: text("objective"),
    budget_type: text("budget_type"),
    budget_amount: doublePrecision("budget_amount"),
    start_date: timestamp("start_date").defaultNow(),
    end_date: timestamp("end_date"),
    status: statusEnum("status").default("stop"),
    created_at: timestamp("created_at").defaultNow()
})