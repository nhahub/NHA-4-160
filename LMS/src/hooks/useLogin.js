import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (userData) => {
      if (userData.role === "super-admin") {
        navigate("/super-admin");
      } else if (userData.role === "admin") {
        navigate("/dashboard");
      } else if (userData.role === "student") {
        navigate(`/${userData.tenant_id}`);
      } else {
        toast.error("Role not recognized!");
      }

      toast.success("Welcome back!");
    },
    onError: (err) => {
      toast.error(err.message || "Invalid email or password");
    },
  });

  return { login, isLoading };
};
