import { supabase, secondarySupabase } from "../config/supabase";

export const getAcademyStudents = async (tenantId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("role", "student");

  if (error) throw error;
  return data;
};

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
  return data;
};
