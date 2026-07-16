import { FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";
import { Placeholder } from "react-bootstrap";
import { useAdminData } from "../../hooks/useAdminData";

const AcademyAbout = () => {
  const { data: admin, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <Placeholder animation="glow">
            <Placeholder
              className="rounded-circle mb-4"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "var(--color-grey-200)",
              }}
            />
          </Placeholder>

          <Placeholder as="h1" animation="glow" className="mb-3">
            <Placeholder
              xs={6}
              className="rounded-3"
              style={{
                height: "40px",
                backgroundColor: "var(--color-grey-300)",
              }}
            />
          </Placeholder>

          <Placeholder as="p" animation="glow" className="fs-5 mb-5">
            <Placeholder
              xs={4}
              className="rounded-3"
              style={{ backgroundColor: "var(--color-grey-200)" }}
            />
          </Placeholder>

          <div
            className="card border-0 shadow-sm text-start"
            style={{ backgroundColor: "var(--color-grey-0)" }}
          >
            <div className="card-body p-4">
              <Placeholder
                as="h5"
                animation="glow"
                className="border-bottom pb-3 mb-4"
                style={{ borderColor: "var(--color-grey-200) !important" }}
              >
                <Placeholder
                  xs={5}
                  className="rounded-3"
                  style={{
                    height: "24px",
                    backgroundColor: "var(--color-grey-300)",
                  }}
                />
              </Placeholder>

              <div className="d-flex align-items-center gap-3 mb-3">
                <Placeholder animation="glow">
                  <Placeholder
                    className="rounded"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "var(--color-grey-200)",
                    }}
                  />
                </Placeholder>
                <Placeholder as="div" animation="glow" className="w-100">
                  <Placeholder
                    xs={3}
                    className="rounded-2 mb-1 d-block"
                    style={{ backgroundColor: "var(--color-grey-200)" }}
                  />
                  <Placeholder
                    xs={6}
                    className="rounded-2"
                    style={{ backgroundColor: "var(--color-grey-300)" }}
                  />
                </Placeholder>
              </div>

              <div className="d-flex align-items-center gap-3">
                <Placeholder animation="glow">
                  <Placeholder
                    className="rounded"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "var(--color-grey-200)",
                    }}
                  />
                </Placeholder>
                <Placeholder as="div" animation="glow" className="w-100">
                  <Placeholder
                    xs={3}
                    className="rounded-2 mb-1 d-block"
                    style={{ backgroundColor: "var(--color-grey-200)" }}
                  />
                  <Placeholder
                    xs={5}
                    className="rounded-2"
                    style={{ backgroundColor: "var(--color-grey-300)" }}
                  />
                </Placeholder>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          Instructed by{" "}
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
