import { supabase } from "../config/supabase";

export const getStoreDetails = async (tenantId) => {
  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("status", "published");

  if (coursesError) throw coursesError;

  const { data: admin, error: adminError } = await supabase
    .from("users")
    .select("name, email, phone")
    .eq("tenant_id", tenantId)
    .eq("role", "admin")
    .single();

  if (adminError) throw adminError;

  return { courses, admin };
};
