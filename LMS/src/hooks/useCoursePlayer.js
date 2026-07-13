import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPlayerDetails,
  updateLessonProgress,
} from "../services/coursePlayerService";
import { supabase } from "../config/supabase";

export const useCoursePlayer = (courseId, tenantId) => {
  return useQuery({
    queryKey: ["coursePlayer", courseId],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      return getPlayerDetails(courseId, user.id, tenantId);
    },
    enabled: !!courseId && !!tenantId,
  });
};

export const useToggleLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ enrollmentId, newCompletedLessons, newProgress }) =>
      updateLessonProgress(enrollmentId, newCompletedLessons, newProgress),
    onSuccess: () => {
      queryClient.invalidateQueries(["coursePlayer", courseId]);
    },
  });
};
