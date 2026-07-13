import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSection } from "../services/curriculumService";

export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSection,

    onSuccess: (_, variables) => {
      toast.success("Section added");

      queryClient.invalidateQueries({
        queryKey: ["course-curriculum", variables.course_id],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}