import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateStudentPassword } from "../services/studentFrontService";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (newPassword) => updateStudentPassword(newPassword),
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to change password");
    },
  });
};
