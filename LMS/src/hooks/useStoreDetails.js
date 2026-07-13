import { useQuery } from "@tanstack/react-query";
import { getStoreDetails } from "../services/storeService";

export const useStoreDetails = (tenantId) => {
  return useQuery({
    queryKey: ["storeDetails", tenantId],
    queryFn: () => getStoreDetails(tenantId),
    enabled: !!tenantId,
  });
};
