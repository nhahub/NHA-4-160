import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCourse } from "../services/courseService";

export const useCreateCourse = (tenantId) => {
  const queryClient = useQueryClient();

  const { mutate: createNewCourse, isPending } = useMutation({
    mutationFn: (courseData) => createCourse({ ...courseData, tenantId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantCourses", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["teacherStats", tenantId] });
      toast.success("Course created successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create course");
    },
  });

  return { createNewCourse, isLoading: isPending };
};
