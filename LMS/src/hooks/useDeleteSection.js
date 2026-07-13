import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSection } from "../services/curriculumService";

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSection,

    onSuccess: () => {
      toast.success("Section Deleted");

      queryClient.invalidateQueries({
        queryKey: ["course-curriculum"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}