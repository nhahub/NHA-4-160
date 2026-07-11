import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authService";

export const useTeacherProfile = () => {
  return useQuery({
    queryKey: ["teacherProfile"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
  });
};
