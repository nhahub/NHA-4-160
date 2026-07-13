import { supabase } from "../config/supabase";

export const loginStudent = async (email, password, tenantId) => {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  if (authError) throw authError;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData.user.id)
    .eq("tenant_id", tenantId)
    .single();

  if (userError || !userData) {
    await supabase.auth.signOut();
    throw new Error("You are not registered in this academy.");
  }
  return userData;
};

export const updateStudentProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateStudentPassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  return true;
};
