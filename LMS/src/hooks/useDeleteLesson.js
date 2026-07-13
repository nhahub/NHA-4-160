import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteLesson } from "../services/curriculumService";

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLesson,

    onSuccess: () => {
      toast.success("Lesson Deleted");

      queryClient.invalidateQueries({
        queryKey: ["course-curriculum"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}