import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getTenantById,
  updateAcademySettings,
} from "../services/tenantService";

export const useAcademySettings = (tenantId) => {
  return useQuery({
    queryKey: ["tenantSettings", tenantId],
    queryFn: () => getTenantById(tenantId),
    enabled: !!tenantId,
  });
};

export const useUpdateAcademySettings = (tenantId) => {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: ({ academyName, logoUrl, discount }) =>
      updateAcademySettings({
        tenantId,
        academyName,
        logoUrl,
        discountPercentage: discount,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantSettings", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
      queryClient.invalidateQueries({ queryKey: ["academy", tenantId] });
      toast.success("Academy settings updated!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update settings");
    },
  });

  return { updateSettings, isLoading: isPending };
};
