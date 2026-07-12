import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { enrollStudentInCourse } from "../services/enrollmentService";

export const useEnrollStudent = (tenantId) => {
  const queryClient = useQueryClient();

  const { mutate: enrollStudent, isPending } = useMutation({
    mutationFn: ({ studentId, courseId }) =>
      enrollStudentInCourse({ studentId, courseId, tenantId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments", tenantId] });
      toast.success("Student enrolled in the course!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to enroll student");
    },
  });

  return { enrollStudent, isLoading: isPending };
};