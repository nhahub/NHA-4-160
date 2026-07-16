import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerTeacher } from "../services/authService";
import toast from "react-hot-toast";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerTeacher,
    onSuccess: () => {
      toast.success("Academy created successfully!");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Registration failed.");
    },
  });
};
