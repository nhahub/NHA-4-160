import { supabase } from "../config/supabase";

// =========================
// Sections
// =========================

export async function createSection(sectionData) {
  const { data, error } = await supabase
    .from("sections")
    .insert([sectionData])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateSection(id, values) {
  const { data, error } = await supabase
    .from("sections")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteSection(id) {
  // حذف جميع الدروس الخاصة بالسيكشن
  const { error: lessonsError } = await supabase
    .from("lessons")
    .delete()
    .eq("section_id", id);

  if (lessonsError) throw lessonsError;

  // حذف السيكشن
  const { error: sectionError } = await supabase
    .from("sections")
    .delete()
    .eq("id", id);

  if (sectionError) throw sectionError;
}

export async function updateSectionsOrder(sections) {
  const promises = sections.map((section, index) =>
    supabase
      .from("sections")
      .update({
        section_order: index + 1,
      })
      .eq("id", section.id)
  );

  await Promise.all(promises);
}

// =========================
// Lessons
// =========================

export async function createLesson(lessonData) {
  const { data, error } = await supabase
    .from("lessons")
    .insert([lessonData])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateLesson(id, values) {
  const { data, error } = await supabase
    .from("lessons")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteLesson(id) {
  const { error } = await supabase
    .from("lessons")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateLessonsOrder(lessons) {
  const promises = lessons.map((lesson, index) =>
    supabase
      .from("lessons")
      .update({
        lesson_order: index + 1,
      })
      .eq("id", lesson.id)
  );

  await Promise.all(promises);
}