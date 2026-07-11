import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();

      navigate("/", { replace: true });

      toast.success("Logged out successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Logout failed");
    },
  });

  return { logout, isLoading };
};
