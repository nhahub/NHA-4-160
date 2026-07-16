import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAcademyAdmin } from "../services/tenantService";

export const useAdminData = () => {
  const { tenantId } = useParams();

  return useQuery({
    queryKey: ["academyAdmin", tenantId],
    queryFn: () => getAcademyAdmin(tenantId),
    enabled: !!tenantId,
  });
};
