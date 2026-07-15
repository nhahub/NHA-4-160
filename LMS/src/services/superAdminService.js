import { supabase } from "../config/supabase";

export const getPaginatedPlans = async (page, limit) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("plans")
    .select("*", { count: "exact" })
    .order("price", { ascending: true })
    .range(from, to);

  if (error) throw error;
  return { data, count };
};

export const createPlan = async (planData) => {
  const { data, error } = await supabase
    .from("plans")
    .insert([planData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePlan = async (planId, updates) => {
  const { data, error } = await supabase
    .from("plans")
    .update(updates)
    .eq("id", planId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePlan = async (planId) => {
  const { error } = await supabase.from("plans").delete().eq("id", planId);
  if (error) throw error;
  return true;
};

export const getPaginatedTenants = async (page, limit) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("tenants")
    .select("*, plans(name), users!admin_uid(name, email)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { data, count };
};

export const deleteTenant = async (tenantId) => {
  const { error } = await supabase.from("tenants").delete().eq("id", tenantId);
  if (error) throw error;
  return true;
};

export const getPaginatedUsers = async (page, limit) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("users")
    .select("*, tenants!users_tenant_id_fkey(academy_name)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { data, count };
};

export const deleteUser = async (userId) => {
  const { error } = await supabase.from("users").delete().eq("id", userId);
  if (error) throw error;
  return true;
};

export const getSystemStats = async () => {
  const [
    tenantsCount,
    usersCount,
    coursesCount,
    coursesRes,
    usersRes,
    tenantsRes,
    enrollmentsRes,
  ] = await Promise.all([
    supabase.from("tenants").select("id", { count: "exact", head: true }),
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase.from("courses").select("id", { count: "exact", head: true }),
    supabase.from("courses").select("status"),
    supabase.from("users").select("created_at"),
    supabase.from("tenants").select("created_at"),
    supabase.from("enrollments").select("enrolled_at"),
  ]);

  if (tenantsCount.error) throw tenantsCount.error;
  if (usersCount.error) throw usersCount.error;
  if (coursesCount.error) throw coursesCount.error;

  const published =
    coursesRes.data?.filter((c) => c.status === "published").length || 0;
  const draft =
    coursesRes.data?.filter((c) => c.status === "draft").length || 0;
  const courseStatusData = [
    { name: "Published", value: published },
    { name: "Draft", value: draft },
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const growthMap = {};
  const d = new Date();

  for (let i = 5; i >= 0; i--) {
    const d2 = new Date(d.getFullYear(), d.getMonth() - i, 1);
    const key = `${months[d2.getMonth()]} ${d2.getFullYear()}`;
    growthMap[key] = { name: key, users: 0, academies: 0, enrollments: 0 };
  }

  usersRes.data?.forEach((u) => {
    const date = new Date(u.created_at);
    const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
    if (growthMap[key]) growthMap[key].users += 1;
  });

  tenantsRes.data?.forEach((t) => {
    const date = new Date(t.created_at);
    const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
    if (growthMap[key]) growthMap[key].academies += 1;
  });

  enrollmentsRes.data?.forEach((e) => {
    const date = new Date(e.enrolled_at);
    const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
    if (growthMap[key]) growthMap[key].enrollments += 1;
  });

  const chartData = Object.values(growthMap);

  return {
    totalTenants: tenantsCount.count || 0,
    totalUsers: usersCount.count || 0,
    totalCourses: coursesCount.count || 0,
    courseStatusData,
    chartData,
  };
};
