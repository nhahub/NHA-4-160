import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderSections } from "../services/curriculumService";

export const useReorderSections = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: moveSections, isPending } = useMutation({
    mutationFn: (items) => reorderSections(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", courseId] });
    },
    // Silent on purpose - this fires on every arrow click, a toast per click would be noisy.
  });

  return { moveSections, isLoading: isPending };
};
