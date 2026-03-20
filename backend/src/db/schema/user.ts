import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "advertiser"])

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    password_hash: text("password_hash"),
    role: roleEnum("role").default("advertiser"),
    created_at: timestamp("created_at").defaultNow()
})