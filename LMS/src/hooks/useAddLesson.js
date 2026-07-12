import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addLesson } from "../services/curriculumService";

export const useAddLesson = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: createLesson, isPending } = useMutation({
    mutationFn: (lessonData) => addLesson(lessonData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", courseId] });
      toast.success("Lesson added!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add lesson");
    },
  });

  return { createLesson, isLoading: isPending };
};
