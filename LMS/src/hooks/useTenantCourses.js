import { useQuery } from "@tanstack/react-query";
import { getTeacherCourses } from "../services/courseService";

export const useTenantCourses = (tenantId) => {
  return useQuery({
    queryKey: ["tenantCourses", tenantId],
    queryFn: () => getTeacherCourses(tenantId),
    enabled: !!tenantId,
  });
};