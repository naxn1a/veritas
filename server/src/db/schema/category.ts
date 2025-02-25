import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { blog, bootcamp, workshop } from ".";
import { relations } from "drizzle-orm";

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  workshop: many(workshop),
  bootcamp: many(bootcamp),
  blog: many(blog),
}));
