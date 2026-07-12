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

/**
 * Same as getAcademyDetails but WITHOUT the "status = active" filter.
 * Needed on the teacher's own Settings page: a teacher whose academy
 * was suspended by the Super Admin should still be able to open the
 * settings screen, not get a "not found" error.
 */
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

/**
 * Lets a teacher update their academy's public identity (White-label):
 * name + logo. Kept intentionally small — plan/status changes are the
 * Super Admin's job, not the teacher's.
 */
export const updateAcademySettings = async ({
  tenantId,
  academyName,
  logoUrl,
}) => {
  const { data, error } = await supabase
    .from("tenants")
    .update({
      academy_name: academyName,
      logo_url: logoUrl,
    })
    .eq("id", tenantId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Lightweight stats for the teacher's own dashboard: total students and
 * total courses, both scoped to this tenant only.
 *
 * Uses { count: "exact", head: true } so Postgres only returns the row
 * COUNT and never pulls the actual rows over the wire.
 */
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