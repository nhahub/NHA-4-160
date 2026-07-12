import { useQuery } from "@tanstack/react-query";
import { getTenantEnrollments } from "../services/enrollmentService";

export const useEnrollments = (tenantId) => {
  return useQuery({
    queryKey: ["enrollments", tenantId],
    queryFn: () => getTenantEnrollments(tenantId),
    enabled: !!tenantId,
  });
};