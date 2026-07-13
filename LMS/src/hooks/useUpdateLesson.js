import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateLesson } from "../services/curriculumService";

export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }) => updateLesson(id, values),

    onSuccess: () => {
      toast.success("Lesson Updated");

      queryClient.invalidateQueries({
        queryKey: ["course-curriculum"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}