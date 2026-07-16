import { useQuery } from "@tanstack/react-query";
import {
  getCourseCurriculum,
  checkEnrollment,
} from "../services/courseService";
import { supabase } from "../config/supabase";

export const useCourseDetails = (courseId) => {
  const { data: currentUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["studentUser"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

  const { data: course, isLoading: isCourseLoading } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => getCourseCurriculum(courseId),
    enabled: !!courseId,
  });

  const { data: isEnrolled, isLoading: isEnrollmentLoading } = useQuery({
    queryKey: ["checkEnrollment", courseId, currentUser?.id],
    queryFn: () => checkEnrollment(courseId, currentUser?.id),
    enabled: !!courseId && !!currentUser,
  });

  return {
    course,
    isEnrolled,
    isStudentLoggedIn: !!currentUser,
    isLoading: isCourseLoading || isUserLoading || isEnrollmentLoading,
  };
};
