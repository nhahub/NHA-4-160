import { supabase } from "../config/supabase";

export const getPublishedCourses = async (tenantId) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
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
