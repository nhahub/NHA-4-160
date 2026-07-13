import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSection } from "../services/curriculumService";

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }) => updateSection(id, values),

    onSuccess: () => {
      toast.success("Section Updated");

      queryClient.invalidateQueries({
        queryKey: ["course-curriculum"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}