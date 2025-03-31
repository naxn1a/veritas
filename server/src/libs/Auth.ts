import Supabase from "@/utils/Supabase";

interface UserRequest {
  email: string;
  password: string;
}

export const handleSignup = async (body: UserRequest) => {
  const { data, error } = await Supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const handleResetPassword = async (password: string) => {
  const { data, error } = await Supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};
