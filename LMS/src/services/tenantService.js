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

export const getTenantById = async (tenantId) => {
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", tenantId)
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

export const updateAcademySettings = async ({
  tenantId,
  academyName,
  logoUrl,
  discountPercentage,
}) => {
  const { data, error } = await supabase
    .from("tenants")
    .update({
      academy_name: academyName,
      logo_url: logoUrl,
      discount_percentage: discountPercentage,
    })
    .eq("id", tenantId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTenantStats = async (tenantId) => {
  const [studentsRes, coursesRes] = await Promise.all([
    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .eq("tenant_id", tenantId)
      .eq("role", "student"),
    supabase
      .from("courses")
      .select("id", { count: "exact", head: true })
      .eq("tenant_id", tenantId),
  ]);

  if (studentsRes.error) throw studentsRes.error;
  if (coursesRes.error) throw coursesRes.error;

  return {
    totalStudents: studentsRes.count ?? 0,
    totalCourses: coursesRes.count ?? 0,
  };
};
