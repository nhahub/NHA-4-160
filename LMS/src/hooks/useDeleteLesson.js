import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteLesson } from "../services/curriculumService";

export const useDeleteLesson = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: removeLesson, isPending } = useMutation({
    mutationFn: (lessonId) => deleteLesson(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseCurriculum", courseId] });
      toast.success("Lesson deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete lesson");
    },
  });

  return { removeLesson, isLoading: isPending };
};
