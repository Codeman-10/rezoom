import { pgTable, text, varchar, uuid } from "drizzle-orm/pg-core"
import { users } from "./user"

export const resumes = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(), // JSON string
  templateId: varchar("template_id", { length: 50 }).notNull(),
})
