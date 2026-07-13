import { useQuery } from "@tanstack/react-query";
import { getStudentEnrollments } from "../services/studentService";
import { supabase } from "../config/supabase";

export const useStudentEnrollments = (tenantId) => {
  return useQuery({
    queryKey: ["studentEnrollments", tenantId],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      return getStudentEnrollments(user.id, tenantId);
    },
    enabled: !!tenantId,
  });
};
