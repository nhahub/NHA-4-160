import { useQuery } from "@tanstack/react-query";
import { getTeacherCourses } from "../services/courseService";

export function useCourses(tenantId) {
  return useQuery({
    queryKey: ["courses", tenantId],
    queryFn: () => getTeacherCourses(tenantId),
    enabled: !!tenantId,
    staleTime: 1000 * 60 * 5,
  });
}