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
    .select(`
      *,
      sections (
        id, title, section_order,
        lessons (
          id, title, video_url, lesson_order
        )
      )
    `)
    .eq("id", courseId)
    .order('section_order', { foreignTable: 'sections', ascending: true })
    .order('lesson_order', { foreignTable: 'sections.lessons', ascending: true })
    .single();

  if (error) throw error;
  return data;
};

// === خلينا دالة واحدة بس هنا ومسحنا المكررة ===
export async function getTeacherCourses(tenantId) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createCourse(course) {
  const { data, error } = await supabase
    .from("courses")
    .insert([course])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCourse(id) {
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
export async function updateCourse(id, values) {
  const { data, error } = await supabase
    .from("courses")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// === دوال الـ CRUD الإضافية للـ Builder ===
export async function createSection(section) {
  const { data, error } = await supabase
    .from("sections")
    .insert([section])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createLesson(lesson) {
  const { data, error } = await supabase
    .from("lessons")
    .insert([lesson])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSectionsOrder(sectionsArray) {
  const promises = sectionsArray.map((section, index) => 
    supabase
      .from("sections")
      .update({ section_order: index })
      .eq("id", section.id)
  );
  await Promise.all(promises);
}
