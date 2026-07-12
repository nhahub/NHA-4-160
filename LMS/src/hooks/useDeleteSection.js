import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSection } from "../services/curriculumService";

export const useDeleteSection = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: removeSection, isPending } = useMutation({
    mutationFn: (sectionId) => deleteSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", courseId] });
      toast.success("Section deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete section");
    },
  });

  return { removeSection, isLoading: isPending };
};
