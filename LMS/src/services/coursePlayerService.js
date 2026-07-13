import { supabase } from "../config/supabase";

export const getPlayerDetails = async (courseId, studentId, tenantId) => {
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(
      `
      *,
      tenants ( academy_name ),
      sections (
        id, title, section_order,
        lessons ( id, title, video_url, lesson_order )
      )
    `,
    )
    .eq("id", courseId)
    .single();

  if (courseError) throw courseError;

  const { data: adminData } = await supabase
    .from("users")
    .select("name")
    .eq("tenant_id", tenantId)
    .eq("role", "admin")
    .single();

  let { data: enrollment, error: enrollmentError } = await supabase
    .from("enrollments")
    .select("*")
    .eq("course_id", courseId)
    .eq("student_id", studentId)
    .maybeSingle();

  if (enrollmentError) throw enrollmentError;

  if (!enrollment) {
    const { data: newEnrollment, error: insertError } = await supabase
      .from("enrollments")
      .insert([
        {
          student_id: studentId,
          course_id: courseId,
          tenant_id: tenantId,
          progress: 0,
          completed_lessons: [],
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;
    enrollment = newEnrollment;
  }

  return {
    course,
    enrollment,
    instructorName: adminData?.name || course.tenants?.academy_name,
  };
};

export const updateLessonProgress = async (
  enrollmentId,
  newCompletedLessons,
  newProgress,
) => {
  const { data, error } = await supabase
    .from("enrollments")
    .update({
      completed_lessons: newCompletedLessons,
      progress: newProgress,
    })
    .eq("id", enrollmentId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
