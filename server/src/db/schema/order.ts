import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { tickets, user } from ".";
import { relations } from "drizzle-orm";

export const order_status = pgEnum("order_status", [
  "pending",
  "paid",
  "cancelled",
  "failed",
  "refunded",
]);

export const order = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => user.id)
    .notNull(),
  status: order_status().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const order_relations = relations(order, ({ one, many }) => ({
  user: one(user, {
    fields: [order.user_id],
    references: [user.id],
  }),
  tickets: many(tickets),
}));
