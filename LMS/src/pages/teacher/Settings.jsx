import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaBuilding } from "react-icons/fa";
import { useTeacherProfile } from "../../hooks/useTeacherProfile";
import {
  useAcademySettings,
  useUpdateAcademySettings,
} from "../../hooks/useAcademySettings";

const inputStyle = {
  backgroundColor: "var(--color-grey-50)",
  color: "var(--color-grey-900)",
  borderColor: "var(--color-grey-300)",
};

const Settings = () => {
  const { data: profile } = useTeacherProfile();
  const tenantId = profile?.tenant_id;

  const { data: tenant, isLoading } = useAcademySettings(tenantId);
  const { updateSettings, isLoading: isSaving } =
    useUpdateAcademySettings(tenantId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (tenant) {
      reset({
        academyName: tenant.academy_name ?? "",
        logoUrl: tenant.logo_url ?? "",
        discount: Number(tenant.discount_percentage ?? 0),
      });
    }
  }, [tenant, reset]);

  const logoPreview = watch("logoUrl");

  const onSubmit = (data) => {
    updateSettings({
      academyName: data.academyName,
      logoUrl: data.logoUrl,
      discount: Number(data.discount),
    });
  };

  if (isLoading) {
    return (
      <div style={{ color: "var(--color-grey-700)" }}>Loading settings...</div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: "var(--color-grey-900)" }}>
          Academy Settings
        </h2>
        <p className="m-0" style={{ color: "var(--color-grey-500)" }}>
          Customize how your academy appears to your students.
        </p>
      </div>

      <div
        className="p-4 rounded-3"
        style={{
          backgroundColor: "var(--color-grey-0)",
          border: "1px solid var(--color-grey-200)",
          maxWidth: "560px",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-3"
        >
          <div className="d-flex align-items-center gap-3 mb-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 overflow-hidden"
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "var(--color-grey-100)",
                border: "1px solid var(--color-grey-200)",
                flexShrink: 0,
              }}
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Academy logo preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <FaBuilding
                  style={{ color: "var(--color-grey-400)", fontSize: "1.5rem" }}
                />
              )}
            </div>
            <p className="m-0 small" style={{ color: "var(--color-grey-500)" }}>
              Logo preview — paste a public image URL below.
            </p>
          </div>

          <div>
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Academy Name
            </label>
            <input
              type="text"
              className="form-control"
              style={inputStyle}
              placeholder="My Academy"
              {...register("academyName", {
                required: "Academy name is required",
              })}
            />
            {errors.academyName && (
              <span className="text-danger small">
                {errors.academyName.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Logo URL
            </label>
            <input
              type="text"
              className="form-control"
              style={inputStyle}
              placeholder="https://example.com/logo.png"
              {...register("logoUrl")}
            />
          </div>
          <div>
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Bulk Discount Percentage (%) for all courses
            </label>
            <input
              type="number"
              className="form-control"
              style={inputStyle}
              placeholder="20"
              {...register("discount", { min: 0, max: 100 })}
            />
            <small className="text-muted">
              Enter 0 to disable bulk discount.
            </small>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="btn fw-bold mt-2"
            style={{
              backgroundColor: "var(--color-brand-600)",
              color: "var(--color-blue-text)",
              padding: "10px 24px",
              alignSelf: "flex-start",
            }}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
