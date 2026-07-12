import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSection } from "../services/curriculumService";

export const useAddSection = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: createSection, isPending } = useMutation({
    mutationFn: (sectionData) => addSection({ ...sectionData, course_id: courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", courseId] });
      toast.success("Section added!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add section");
    },
  });

  return { createSection, isLoading: isPending };
};
