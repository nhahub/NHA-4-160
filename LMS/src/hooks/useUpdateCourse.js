import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCourse } from "../services/courseService";

export const useUpdateCourse = (tenantId) => {
  const queryClient = useQueryClient();

  const { mutate: editCourse, isPending } = useMutation({
    mutationFn: ({ courseId, updates }) => updateCourse(courseId, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tenantCourses", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", data.id] });
      toast.success("Course updated!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update course");
    },
  });

  return { editCourse, isLoading: isPending };
};
