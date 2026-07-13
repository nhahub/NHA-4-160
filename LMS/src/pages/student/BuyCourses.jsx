import { useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaWhatsapp,
  FaUserTie,
  FaGraduationCap,
} from "react-icons/fa";
import { useStoreDetails } from "../../hooks/useStoreDetails";

const BuyCourses = () => {
  const { tenantId } = useParams();

  const { data, isLoading } = useStoreDetails(tenantId);

  const totalPrice = data?.courses
    ? data.courses.reduce((sum, course) => sum + Number(course.price || 0), 0)
    : 0;

  if (isLoading) {
    return (
      <div
        className="py-5 text-center fw-bold"
        style={{ color: "var(--color-grey-600)" }}
      >
        Loading store details...
      </div>
    );
  }

  const { courses, admin } = data;

  return (
    <div className="row justify-content-center g-5">
      <div className="text-center mb-2">
        <h1 className="fw-bold" style={{ color: "var(--color-grey-900)" }}>
          Available Courses
        </h1>
        <p style={{ color: "var(--color-grey-500)" }}>
          Browse our catalog and get in touch to enroll.
        </p>
      </div>

      <div className="col-12 col-lg-7">
        <div className="d-flex flex-column gap-3">
          {courses?.length === 0 ? (
            <div
              className="card border-0 shadow-sm p-5 text-center"
              style={{ backgroundColor: "var(--color-grey-0)" }}
            >
              <p className="mb-0" style={{ color: "var(--color-grey-500)" }}>
                No courses available right now.
              </p>
            </div>
          ) : (
            courses?.map((course) => (
              <div
                key={course.id}
                className="card border-0 shadow-sm d-flex flex-row align-items-center p-3"
                style={{
                  backgroundColor: "var(--color-grey-0)",
                  borderRadius: "12px",
                }}
              >
                <div
                  className="rounded-3 overflow-hidden d-none d-sm-block"
                  style={{ width: "120px", height: "80px", flexShrink: 0 }}
                >
                  <img
                    src={
                      course.thumbnail_url || "https://via.placeholder.com/150"
                    }
                    alt={course.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="ms-sm-4 flex-grow-1">
                  <h5
                    className="fw-bold mb-1"
                    style={{ color: "var(--color-grey-900)" }}
                  >
                    {course.title}
                  </h5>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "var(--color-brand-50)",
                      color: "var(--color-brand-700)",
                    }}
                  >
                    {course.category || "General"}
                  </span>
                </div>
                <div className="ms-3 text-end">
                  <h4
                    className="fw-bold mb-0"
                    style={{ color: "var(--color-brand-600)" }}
                  >
                    ${course.price}
                  </h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div
          className="card border-0 shadow-sm sticky-top"
          style={{
            top: "100px",
            backgroundColor: "var(--color-grey-0)",
            borderRadius: "16px",
          }}
        >
          <div className="card-body p-4 p-md-5">
            <h4
              className="fw-bold mb-4 border-bottom pb-3"
              style={{
                color: "var(--color-grey-900)",
                borderColor: "var(--color-grey-200)",
              }}
            >
              Purchase Summary
            </h4>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fs-5" style={{ color: "var(--color-grey-600)" }}>
                Total Value:
              </span>
              <span
                className="fs-2 fw-bold"
                style={{ color: "var(--color-grey-900)" }}
              >
                ${totalPrice}
              </span>
            </div>

            <div
              className="p-4 rounded-3 mt-4"
              style={{
                backgroundColor: "var(--color-grey-50)",
                border: "1px solid var(--color-grey-200)",
              }}
            >
              <h6
                className="fw-bold mb-3 d-flex align-items-center gap-2"
                style={{ color: "var(--color-brand-600)" }}
              >
                <FaGraduationCap size={20} /> How to enroll?
              </h6>
              <p
                className="small mb-4"
                style={{ color: "var(--color-grey-600)", lineHeight: "1.6" }}
              >
                To purchase any of these courses, please contact the instructor
                directly. They will set up your student account and grant you
                instant access.
              </p>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="p-2 rounded-circle"
                    style={{
                      backgroundColor: "var(--color-grey-200)",
                      color: "var(--color-grey-700)",
                    }}
                  >
                    <FaUserTie />
                  </div>
                  <div>
                    <small
                      className="d-block text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Instructor
                    </small>
                    <span
                      className="fw-bold"
                      style={{ color: "var(--color-grey-900)" }}
                    >
                      {admin?.name}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="p-2 rounded-circle"
                    style={{
                      backgroundColor: "var(--color-brand-50)",
                      color: "var(--color-brand-600)",
                    }}
                  >
                    <FaWhatsapp />
                  </div>
                  <div>
                    <small
                      className="d-block text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Phone / WhatsApp
                    </small>
                    <span
                      className="fw-bold"
                      style={{ color: "var(--color-grey-900)" }}
                    >
                      {admin?.phone || "Not provided"}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="p-2 rounded-circle"
                    style={{
                      backgroundColor: "var(--color-brand-50)",
                      color: "var(--color-brand-600)",
                    }}
                  >
                    <FaEnvelope />
                  </div>
                  <div className="text-truncate">
                    <small
                      className="d-block text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Email
                    </small>
                    <span
                      className="fw-bold text-truncate"
                      style={{ color: "var(--color-grey-900)" }}
                    >
                      {admin?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {admin?.phone && (
              <a
                href={`https://wa.me/${admin.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="btn w-100 fw-bold mt-4 d-flex justify-content-center align-items-center gap-2"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  padding: "12px",
                }}
              >
                <FaWhatsapp size={20} /> Contact via WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCourses;
