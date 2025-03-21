import db from "@/db";
import { role, user } from "@/db/schema";
import { UserAuthType } from "@/models/users";
import Supabase from "@/utils/Supabase";
import { eq } from "drizzle-orm";

export const signup = async (body: UserAuthType) => {
  const { data, error } = await Supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if (error) throw error;

  const result = await db.transaction(async (tx) => {
    const role_user = await tx.query.role.findFirst({
      where: eq(role.name, "user"),
    });

    const [created] = await tx
      .insert(user)
      .values({
        auth_id: data.user!.id,
        email: body.email,
        username: body.email.split("@")[0],
        role_id: role_user!.id,
        status: "active",
      })
      .returning();

    return created;
  });

  return result;
};

export const signin = async (body: UserAuthType) => {
  const { data, error } = await Supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error) throw error;

  return data;
};

export const refreshToken = async (refresh_token: string) => {
  const { data, error } = await Supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) throw error;

  return data;
};
