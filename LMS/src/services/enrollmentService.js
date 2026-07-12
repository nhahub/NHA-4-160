import { supabase } from "../config/supabase";

/**
 * Returns every enrollment for a tenant, joined with the student's name
 * and the course's title — used to show "who is enrolled in what" on
 * the Students page.
 */
export const getTenantEnrollments = async (tenantId) => {
  const { data, error } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      progress,
      enrolled_at,
      student_id,
      course_id,
      users:student_id ( name, email ),
      courses:course_id ( title )
    `,
    )
    .eq("tenant_id", tenantId);

  if (error) throw error;
  return data;
};

/**
 * Enrolls a student in a course (i.e. "gives access" to a course).
 * Guards against duplicate enrollment before inserting.
 */
export const enrollStudentInCourse = async ({
  studentId,
  courseId,
  tenantId,
}) => {
  const { data: existing, error: checkError } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", studentId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existing) {
    throw new Error("This student is already enrolled in that course.");
  }

  const { data, error } = await supabase
    .from("enrollments")
    .insert([
      {
        student_id: studentId,
        course_id: courseId,
        tenant_id: tenantId,
        progress: 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Removes a student's access to a course.
 */
export const removeEnrollment = async (enrollmentId) => {
  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("id", enrollmentId);

  if (error) throw error;
  return true;
};