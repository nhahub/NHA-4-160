import { useQuery } from "@tanstack/react-query";
import { supabase } from "../config/supabase";

export const useMyCourses = (tenantId) => {
  return useQuery({
    queryKey: ["myCourses", tenantId],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("enrollments")
        .select(
          `
          progress,
          courses (
            id, title, description, thumbnail_url, category
          )
        `,
        )
        .eq("student_id", user.id)
        .eq("tenant_id", tenantId);

      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });
};
