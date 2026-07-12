import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addStudent } from "../services/studentService";

export const useAddStudent = (tenantId) => {
  const queryClient = useQueryClient();

  const { mutate: createStudent, isPending } = useMutation({
    mutationFn: (studentData) => addStudent({ ...studentData, tenantId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["teacherStats", tenantId] });
      toast.success("Student added successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add student");
    },
  });

  return { createStudent, isLoading: isPending };
};