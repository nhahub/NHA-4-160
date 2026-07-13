import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCourse } from "../services/courseService";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,

    onSuccess: () => {
      toast.success("Course created successfully");

      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
}