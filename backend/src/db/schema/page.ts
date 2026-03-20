import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";

export const pages = pgTable("pages", {
    id: uuid("id").primaryKey(),
    user_id: uuid("user_id").references(() => users.id).notNull(),
    name: text("name"),
    category: text("category"),
    followers: integer("followers").default(0),
    is_verified: boolean("is_verified").default(false),
    created_at: timestamp("created_at").defaultNow()
})