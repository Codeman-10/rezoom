import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),   // internal UUID
  googleId: text("google_id"),                   // raw Google account ID
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),           // nullable for Google users
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
