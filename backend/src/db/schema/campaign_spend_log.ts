import { date, doublePrecision, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { campaign } from "./campaign";

export const campaign_spend_log = pgTable("campaign_spend_log", {
    id: uuid("id").defaultRandom().primaryKey(),
    campaign_id: uuid("campaign_id").references(() => campaign.id, {onDelete: 'cascade'}),
    date: date("date"),
    amount_spent: doublePrecision("amount_spent"),
    created_at: timestamp("created_at").defaultNow()
})  