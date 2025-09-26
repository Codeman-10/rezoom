// src/db/schema/templates.ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),         // e.g., "Clean", "Modern", "ATS-friendly"
  description: text("description"),     // short info
  previewUrl: text("preview_url"),      // optional URL for preview image
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
