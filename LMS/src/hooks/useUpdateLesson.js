import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateLesson } from "../services/curriculumService";

export const useUpdateLesson = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: editLesson, isPending } = useMutation({
    mutationFn: ({ lessonId, updates }) => updateLesson(lessonId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", courseId] });
      toast.success("Lesson updated!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update lesson");
    },
  });

  return { editLesson, isLoading: isPending };
};
