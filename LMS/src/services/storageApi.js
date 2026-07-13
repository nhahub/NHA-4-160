import { supabase } from "../config/supabase";

export async function uploadCourseImage(file) {
  const extension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { data, error } = await supabase.storage
    .from("course-images")
    .upload(fileName, file);

  console.log("UPLOAD DATA:", data);
  console.log("UPLOAD ERROR:", error);

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("course-images")
    .getPublicUrl(fileName);

  console.log("PUBLIC URL:", publicUrlData.publicUrl);

  return publicUrlData.publicUrl;
}