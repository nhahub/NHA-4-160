import { useQuery } from "@tanstack/react-query";
import { getCourseCurriculum } from "../services/courseService"; // أو curriculumService حسب أنت حاططها فين

export function useCurriculum(courseId) {
  return useQuery({
    queryKey: ["curriculum", courseId],
    queryFn: () => getCourseCurriculum(courseId),
    enabled: !!courseId, // مش هيشتغل إلا لو الـ courseId موجود فعلاً
  });
}