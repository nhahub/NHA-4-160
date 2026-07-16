import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTenantCategories, createCategory } from "../services/courseService";

export const useTenantCategories = (tenantId) => {
  return useQuery({
    queryKey: ["categories", tenantId],
    queryFn: () => getTenantCategories(tenantId),
    enabled: !!tenantId,
  });
};

export const useCreateCategory = (tenantId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name) => createCategory({ tenantId, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", tenantId] });
      toast.success("Category added successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add category");
    },
  });
};
