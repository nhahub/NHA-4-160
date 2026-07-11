import { useQuery } from "@tanstack/react-query";
import { getAcademyWithCourses } from "../services/tenantService";

export const useAcademy = (tenantId) => {
  return useQuery({
    queryKey: ["academy", tenantId],
    queryFn: () => getAcademyWithCourses(tenantId),
    enabled: !!tenantId,
  });
};
