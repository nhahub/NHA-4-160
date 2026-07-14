import { supabase } from "../config/supabase";

export const getPublishedCourses = async (tenantId) => {
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, price, thumbnail_url, category, status")
    .eq("tenant_id", tenantId)
    .eq("status", "published");

  if (error) throw error;
  return data;
};

export const getCourseCurriculum = async (courseId) => {
  const { data, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      sections (
        id, title, section_order,
        lessons (
          id, title, video_url, lesson_order
        )
      )
    `,
    )
    .eq("id", courseId)
    .single();

  if (error) throw error;
  return data;
};

/**
 * NOTE for the team: small read-only addition. Returns ALL of the
 * teacher's courses (draft + published), unlike getPublishedCourses
 * which is for the public storefront. The Students & Settings screens
 * need this to populate the "enroll student in course" dropdown — a
 * teacher should be able to enroll a student even in a course that
 * isn't published yet.
 */
export const getTeacherCourses = async (tenantId) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Creates a new course (starts as "draft" unless a status is given).
 */
export const createCourse = async ({
  tenantId,
  title,
  description,
  price,
  status = "draft",
}) => {
  const { data, error } = await supabase
    .from("courses")
    .insert([
      {
        tenant_id: tenantId,
        title,
        description,
        price,
        status,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Updates a course's own fields (title, description, price, image,
 * published/draft status). Curriculum (sections/lessons) is handled
 * separately in curriculumService.
 */
export const updateCourse = async (courseId, updates) => {
  const { data, error } = await supabase
    .from("courses")
    .update(updates)
    .eq("id", courseId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Deletes a course. Assumes sections/lessons/enrollments cascade via
 * FK constraints on the database side.
 */
export const deleteCourse = async (courseId) => {
  const { error } = await supabase.from("courses").delete().eq("id", courseId);
  if (error) throw error;
  return true;
};
