import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../config/supabase";
import { FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";

const AcademyAbout = () => {
  const { tenantId } = useParams();

  const { data: admin, isLoading } = useQuery({
    queryKey: ["academyAdmin", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          "name, email, phone, tenants!users_tenant_id_fkey(academy_name)",
        )
        .eq("tenant_id", tenantId)
        .eq("role", "admin")
        .single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading)
    return (
      <div
        className="py-5 text-center fw-bold"
        style={{ color: "var(--color-grey-600)" }}
      >
        Loading...
      </div>
    );

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6 text-center">
        <div
          className="p-4 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "var(--color-grey-100)",
          }}
        >
          <FaBuilding size={40} style={{ color: "var(--color-brand-600)" }} />
        </div>

        <h1 className="fw-bold mb-3" style={{ color: "var(--color-grey-900)" }}>
          {admin?.tenants?.academy_name}
        </h1>

        <p className="fs-5 mb-5" style={{ color: "var(--color-grey-600)" }}>
          Instructed by
          <span className="fw-bold" style={{ color: "var(--color-grey-900)" }}>
            {admin?.name}
          </span>
        </p>

        <div
          className="card border-0 shadow-sm text-start"
          style={{ backgroundColor: "var(--color-grey-0)" }}
        >
          <div className="card-body p-4">
            <h5
              className="fw-bold border-bottom pb-3 mb-4"
              style={{
                color: "var(--color-grey-900)",
                borderColor: "var(--color-grey-200) !important",
              }}
            >
              Contact Information
            </h5>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="p-2 rounded"
                style={{
                  backgroundColor: "var(--color-brand-50)",
                  color: "var(--color-brand-600)",
                }}
              >
                <FaEnvelope size={20} />
              </div>
              <div>
                <small
                  className="d-block"
                  style={{ color: "var(--color-grey-500)" }}
                >
                  Email Address
                </small>
                <span
                  className="fw-bold"
                  style={{ color: "var(--color-grey-900)" }}
                >
                  {admin?.email}
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div
                className="p-2 rounded"
                style={{
                  backgroundColor: "var(--color-brand-50)",
                  color: "var(--color-brand-600)",
                }}
              >
                <FaPhone size={20} />
              </div>
              <div>
                <small
                  className="d-block"
                  style={{ color: "var(--color-grey-500)" }}
                >
                  Phone Number
                </small>
                <span
                  className="fw-bold"
                  style={{ color: "var(--color-grey-900)" }}
                >
                  {admin?.phone || "Not provided"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyAbout;
