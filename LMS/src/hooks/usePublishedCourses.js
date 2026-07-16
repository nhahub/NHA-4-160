import { useQuery } from "@tanstack/react-query";
import { getPublishedCourses } from "../services/courseService";

export const usePublishedCourses = (tenantId) => {
  return useQuery({
    queryKey: ["publishedCourses", tenantId],
    queryFn: () => getPublishedCourses(tenantId),
    enabled: !!tenantId,
  });
};
