import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTenantById, updateAcademySettings } from "../services/tenantService";

/**
 * Reads the tenant's current settings (name + logo) so the Settings
 * form can be pre-filled.
 */
export const useAcademySettings = (tenantId) => {
  return useQuery({
    queryKey: ["tenantSettings", tenantId],
    queryFn: () => getTenantById(tenantId),
    enabled: !!tenantId,
  });
};

/**
 * Mutation to persist changes made on the Settings form.
 */
export const useUpdateAcademySettings = (tenantId) => {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: ({ academyName, logoUrl }) =>
      updateAcademySettings({ tenantId, academyName, logoUrl }),
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