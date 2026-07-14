import { supabase } from "../config/supabase";

export async function uploadCourseImage(file) {
  const extension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("course-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("course-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
