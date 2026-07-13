import { useQuery } from "@tanstack/react-query";
import { getCourseCurriculum } from "../services/courseService";

export function useCourseCurriculum(courseId) {
  return useQuery({
    queryKey: ["course-curriculum", courseId],
    queryFn: () => getCourseCurriculum(courseId),
    enabled: !!courseId,
  });
}