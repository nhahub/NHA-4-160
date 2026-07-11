import { supabase } from "../config/supabase";

export const addSection = async (sectionData) => {
  const { data, error } = await supabase
    .from("sections")
    .insert([sectionData])
    .select();

  if (error) throw error;
  return data[0];
};

export const addLesson = async (lessonData) => {
  const { data, error } = await supabase
    .from("lessons")
    .insert([lessonData])
    .select();

  if (error) throw error;
  return data[0];
};
