// src/hooks/student/useUpdateProfile.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "../config/supabase";
import { updateStudentProfile } from "../services/studentFrontService";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");
      return updateStudentProfile(user.id, updates);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["studentProfile"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile");
    },
  });
};
