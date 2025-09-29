import {
  pgTable,
  uuid,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const userCredits = pgTable("user_credits", {
  userId: uuid("user_id")
    .references(() => users.id)
    .primaryKey(),
  credits: integer("credits").default(100).notNull(),
  subscriptionActive: boolean("subscription_active").default(false),
  lastPayment: timestamp("last_payment"),
});
