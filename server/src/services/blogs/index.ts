import db from "@/db";
import { eq } from "drizzle-orm";
import { blog } from "@/db/schema";
import { QueryType } from "@/models/query";
import { BlogType } from "@/models/blog";

export const createBlog = async (body: BlogType) => {
  const [result] = await db.insert(blog).values(body).returning();

  if (!result) throw new Error("Failed to create blog");

  return { message: "Create blog", data: null };
};

export const getAllBlog = async ({ limit, offset }: QueryType = {}) => {
  const result = await db.query.blog.findMany({
    limit,
    offset,
  });

  return { message: "Get all blogs", data: result };
};

export const getBlogById = async (id: string) => {
  const result = await db.query.blog.findFirst({
    where: eq(blog.id, id),
  });

  if (!result) throw new Error("Blog not found");

  return { message: "Get blog by id", data: result };
};

export const updateBlog = async (id: string, body: BlogType) => {
  const [result] = await db
    .update(blog)
    .set(body)
    .where(eq(blog.id, id))
    .returning();

  if (!result) throw new Error("Failed to update blog");

  return { message: `Update blog ${result.title} success`, data: null };
};

export const deleteBlog = async (id: string) => {
  const [result] = await db.delete(blog).where(eq(blog.id, id)).returning();

  if (!result) throw new Error("Failed to delete blog");

  return { message: `Delete blog ${result.title} success`, data: null };
};
