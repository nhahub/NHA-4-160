import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../services/courseService";
import toast from "react-hot-toast";

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,

    onSuccess: () => {
      toast.success("Course deleted");

      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}