import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "../services/courseService";

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }) =>
      updateCourse(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });
}