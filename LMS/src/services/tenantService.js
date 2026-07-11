import { supabase } from "../config/supabase";

export const getAcademyWithCourses = async (tenantId) => {
  const { data, error } = await supabase
    .from("tenants")
    .select(
      `
      *,
      courses(*)
    `,
    )
    .eq("id", tenantId)
    .single();

  if (error) throw error;
  return data;
};

export const getAcademyDetails = async (tenantId) => {
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", tenantId)
    .eq("status", "active")
    .single();

  if (error) throw error;
  return data;
};

export const createTenant = async ({ id, academy_name, admin_uid, planId }) => {
  const { data, error } = await supabase
    .from("tenants")
    .insert([
      {
        id,
        academy_name,
        admin_uid,
        plan_id: planId,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
};
