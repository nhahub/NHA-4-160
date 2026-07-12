import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCourse } from "../services/courseService";

export const useDeleteCourse = (tenantId) => {
  const queryClient = useQueryClient();

  const { mutate: removeCourse, isPending } = useMutation({
    mutationFn: (courseId) => deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantCourses", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["teacherStats", tenantId] });
      toast.success("Course deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete course");
    },
  });

  return { removeCourse, isLoading: isPending };
};
