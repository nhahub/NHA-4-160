import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateLessonsOrder } from "../services/curriculumService";

export function useUpdateLessonsOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLessonsOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-curriculum"],
      });

      toast.success("Lessons reordered");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}