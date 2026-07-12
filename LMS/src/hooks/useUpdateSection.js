import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSection } from "../services/curriculumService";

export const useUpdateSection = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: editSection, isPending } = useMutation({
    mutationFn: ({ sectionId, updates }) => updateSection(sectionId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", courseId] });
      toast.success("Section updated!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update section");
    },
  });

  return { editSection, isLoading: isPending };
};
