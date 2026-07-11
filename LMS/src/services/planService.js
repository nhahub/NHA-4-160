import { supabase } from "../config/supabase";

export const getPlans = async () => {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .order("price", { ascending: true });

  if (error) throw error;
  return data;
};

export const getTenantPlan = async (tenantId) => {
  const { data, error } = await supabase
    .from("tenants")
    .select(
      `
      plan_id,
      plans (*) 
    `,
    )
    .eq("id", tenantId)
    .single();

  if (error) throw error;
  return data;
};
