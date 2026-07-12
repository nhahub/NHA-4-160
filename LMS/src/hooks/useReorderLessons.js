import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderLessons } from "../services/curriculumService";

export const useReorderLessons = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: moveLessons, isPending } = useMutation({
    mutationFn: (items) => reorderLessons(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", courseId] });
    },
    // Silent on purpose - this fires on every arrow click, a toast per click would be noisy.
  });

  return { moveLessons, isLoading: isPending };
};
