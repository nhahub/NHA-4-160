import { supabase, secondarySupabase } from "../config/supabase";

/**
 * Returns every student (role = "student") that belongs to a given
 * tenant (academy). Used on the Students page and for the dashboard
 * stats count.
 */
export const getAcademyStudents = async (tenantId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("role", "student")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Returns the list of courses a specific student is enrolled in,
 * scoped to the current tenant.
 */
export const getStudentEnrollments = async (studentId, tenantId) => {
  const { data, error } = await supabase
    .from("enrollments")
    .select(
      `
      progress,
      enrolled_at,
      courses (*)
    `,
    )
    .eq("student_id", studentId)
    .eq("tenant_id", tenantId);

  if (error) throw error;
  return data;
};

/**
 * Creates a brand-new student:
 * 1) Creates the Auth user via the SECONDARY client (so the teacher's
 *    own session isn't overwritten).
 * 2) Inserts the profile row in "users" with role="student" and links
 *    it to the teacher's tenant_id so it never leaks into another
 *    academy.
 */
export const addStudent = async ({
  name,
  email,
  password,
  phone,
  tenantId,
}) => {
  const { data: authData, error: authError } =
    await secondarySupabase.auth.signUp({
      email,
      password,
    });

  if (authError) throw authError;

  if (!authData.user) {
    throw new Error(
      "Could not create the student account. Please try again.",
    );
  }

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        id: authData.user.id,
        name,
        email,
        phone,
        role: "student",
        tenant_id: tenantId,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // The secondary client isn't persisting sessions, but we clear it
  // explicitly to make sure nothing lingers in memory.
  await secondarySupabase.auth.signOut();

  return data;
};