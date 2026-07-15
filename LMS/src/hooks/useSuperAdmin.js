import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getPaginatedPlans,
  createPlan,
  updatePlan,
  deletePlan,
  getPaginatedTenants,
  deleteTenant,
  getPaginatedUsers,
  deleteUser,
  getSystemStats,
} from "../services/superAdminService";

export const usePlansPaginated = (page, limit) => {
  return useQuery({
    queryKey: ["adminPlans", page, limit],
    queryFn: () => getPaginatedPlans(page, limit),
    keepPreviousData: true,
  });
};

export const useManagePlans = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPlans"] });
      toast.success("Plan created successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) => updatePlan(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPlans"] });
      toast.success("Plan updated successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPlans"] });
      toast.success("Plan deleted successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addMutation, updateMutation, deleteMutation };
};

export const useTenantsPaginated = (page, limit) => {
  return useQuery({
    queryKey: ["adminTenants", page, limit],
    queryFn: () => getPaginatedTenants(page, limit),
    keepPreviousData: true,
  });
};

export const useManageTenants = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminTenants"] });
      toast.success("Tenant deleted successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteMutation };
};

export const useUsersPaginated = (page, limit) => {
  return useQuery({
    queryKey: ["adminUsers", page, limit],
    queryFn: () => getPaginatedUsers(page, limit),
    keepPreviousData: true,
  });
};

export const useManageUsers = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      toast.success("User deleted successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteMutation };
};

export const useSystemStats = () => {
  return useQuery({
    queryKey: ["systemStats"],
    queryFn: getSystemStats,
  });
};
