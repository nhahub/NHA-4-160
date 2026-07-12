import { supabase } from "../config/supabase";

/* ------------------------------- Sections ------------------------------- */

export const addSection = async (sectionData) => {
  const { data, error } = await supabase
    .from("sections")
    .insert([sectionData])
    .select();

  if (error) throw error;
  return data[0];
};

export const updateSection = async (sectionId, updates) => {
  const { data, error } = await supabase
    .from("sections")
    .update(updates)
    .eq("id", sectionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteSection = async (sectionId) => {
  const { error } = await supabase.from("sections").delete().eq("id", sectionId);
  if (error) throw error;
  return true;
};

/**
 * Batch-updates section_order for a list of sections. Used when the
 * teacher moves a section up/down so the whole list stays consistent.
 * items: [{ id, section_order }]
 */
export const reorderSections = async (items) => {
  const results = await Promise.all(
    items.map((item) =>
      supabase.from("sections").update({ section_order: item.section_order }).eq("id", item.id),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
  return true;
};

/* -------------------------------- Lessons -------------------------------- */

export const addLesson = async (lessonData) => {
  const { data, error } = await supabase
    .from("lessons")
    .insert([lessonData])
    .select();

  if (error) throw error;
  return data[0];
};

export const updateLesson = async (lessonId, updates) => {
  const { data, error } = await supabase
    .from("lessons")
    .update(updates)
    .eq("id", lessonId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteLesson = async (lessonId) => {
  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
  if (error) throw error;
  return true;
};

/**
 * Batch-updates lesson_order for a list of lessons within a section.
 * items: [{ id, lesson_order }]
 */
export const reorderLessons = async (items) => {
  const results = await Promise.all(
    items.map((item) =>
      supabase.from("lessons").update({ lesson_order: item.lesson_order }).eq("id", item.id),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
  return true;
};
