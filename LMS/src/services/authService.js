import { supabase } from "../config/supabase";

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (userError) throw userError;

  return userData;
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No user found");

  const { data, error } = await supabase
    .from("users")
    .select(
      `
      *,
      tenants (
        academy_name
      )
      `
    )
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error("User profile not found in users table");
  }

  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

export const registerTeacher = async (formData) => {
  const { name, email, password, phone, academyName, planId } = formData;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (authError) throw authError;

  const userId = authData.user.id;
  const tenantId = academyName.toLowerCase().replace(/\s+/g, "-");

  const { error: tenantError } = await supabase.from("tenants").insert([
    {
      id: tenantId,
      academy_name: academyName,
      admin_uid: userId,
      plan_id: planId,
    },
  ]);

  if (tenantError) throw tenantError;

  const { error: userError } = await supabase.from("users").insert([
    {
      id: userId,
      name,
      email,
      phone,
      role: "admin",
      tenant_id: tenantId,
    },
  ]);

  if (userError) throw userError;

  return { success: true, tenantId };
};