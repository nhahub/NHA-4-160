import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createLesson } from "../services/curriculumService";

export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLesson,

    onSuccess: (_, variables) => {
      toast.success("Lesson Added");

      queryClient.invalidateQueries({
        queryKey: ["course-curriculum", variables.course_id],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}