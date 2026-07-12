import { useQuery } from "@tanstack/react-query";
import { getAcademyStudents } from "../services/studentService";

/**
 * Fetches every student belonging to the given tenant.
 * Powers the Students table on the /dashboard/students page.
 */
export const useStudents = (tenantId) => {
  return useQuery({
    queryKey: ["students", tenantId],
    queryFn: () => getAcademyStudents(tenantId),
    enabled: !!tenantId,
  });
};