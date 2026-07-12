import { useQuery } from "@tanstack/react-query";
import { getCourseCurriculum } from "../services/courseService";

export const useCourseCurriculum = (courseId) => {
  return useQuery({
    queryKey: ["courseCurriculum", courseId],
    queryFn: () => getCourseCurriculum(courseId),
    enabled: !!courseId,
  });
};
