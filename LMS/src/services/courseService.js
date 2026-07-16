import { supabase } from "../config/supabase";

export const getTenantCategories = async (tenantId) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const createCategory = async ({ tenantId, name }) => {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ tenant_id: tenantId, name }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

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

export const getTeacherCourses = async (tenantId) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createCourse = async ({
  tenantId,
  title,
  description,
  price,
  status = "draft",
  thumbnail_url,
  category,
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
        thumbnail_url,
        category,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

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

export const deleteCourse = async (courseId) => {
  const { error } = await supabase.from("courses").delete().eq("id", courseId);
  if (error) throw error;
  return true;
};

export const checkEnrollment = async (courseId, studentId) => {
  if (!studentId) return false;
  const { data, error } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", studentId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
};
