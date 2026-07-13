import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSectionsOrder } from "../services/curriculumService";

export function useUpdateSectionsOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSectionsOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-curriculum"],
      });

      toast.success("Sections reordered");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}