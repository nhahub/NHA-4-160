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
