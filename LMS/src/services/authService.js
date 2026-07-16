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
    .select("*, tenants!users_tenant_id_fkey(academy_name)")
    .eq("id", user.id)
    .single();

  if (error) throw error;
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
      data: { name: name },
    },
  });

  if (authError) throw authError;

  const userId = authData.user.id;
  const tenantId = academyName.toLowerCase().replace(/\s+/g, "-");

  const { error: tenantError } = await supabase.from("tenants").insert([
    {
      id: tenantId,
      academy_name: academyName,
      plan_id: planId,
    },
  ]);

  if (tenantError) throw tenantError;

  const { error: userError } = await supabase.from("users").insert([
    {
      id: userId,
      name: name,
      email: email,
      phone: phone,
      role: "admin",
      tenant_id: tenantId,
    },
  ]);

  if (userError) throw userError;

  const { error: updateTenantError } = await supabase
    .from("tenants")
    .update({ admin_uid: userId })
    .eq("id", tenantId);

  if (updateTenantError) throw updateTenantError;

  return { success: true, tenantId };
};
