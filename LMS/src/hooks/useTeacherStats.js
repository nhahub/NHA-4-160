import { useQuery } from "@tanstack/react-query";
import { getTenantStats } from "../services/tenantService";

export const useTeacherStats = (tenantId) => {
  return useQuery({
    queryKey: ["teacherStats", tenantId],
    queryFn: () => getTenantStats(tenantId),
    enabled: !!tenantId,
  });
};