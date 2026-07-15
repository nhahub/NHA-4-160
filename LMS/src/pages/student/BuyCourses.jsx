import { useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaWhatsapp,
  FaUserTie,
  FaGraduationCap,
  FaTag,
} from "react-icons/fa";
import { useStoreDetails } from "../../hooks/useStoreDetails";

const BuyCourses = () => {
  const { tenantId } = useParams();
  const { data, isLoading } = useStoreDetails(tenantId);
  console.log(data);

  const discount =
    data?.tenant?.discount_percentage ||
    data?.admin?.tenants?.discount_percentage ||
    0;
  const subTotal =
    data?.courses?.reduce((sum, c) => sum + Number(c.price || 0), 0) || 0;
  const discountAmount = subTotal * (discount / 100);
  const finalTotal = subTotal - discountAmount;

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

      {/* الجزء الخاص بعرض الكورسات (بدون خصم على كل كورس) */}
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
                    ${Number(course.price).toFixed(2)}
                  </h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* الجزء الخاص بالفاتورة (التوتال والخصومات) */}
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

            <div className="mb-4">
              {/* رسالة تشجيعية جذابة لو في خصم */}
              {discount > 0 && (
                <div
                  className="alert border-0 d-flex align-items-center gap-2 mb-4"
                  style={{
                    backgroundColor: "var(--color-brand-50)",
                    color: "var(--color-brand-700)",
                    borderRadius: "8px",
                  }}
                >
                  <FaTag size={20} />
                  <span className="fw-bold">
                    Bundle offer! Save {discount}% on the total price.
                  </span>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mb-2">
                <span style={{ color: "var(--color-grey-600)" }}>
                  Total Courses Price:
                </span>
                <span
                  className="fw-bold"
                  style={{ color: "var(--color-grey-900)" }}
                >
                  ${subTotal.toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <div
                  className="d-flex justify-content-between align-items-center mb-3"
                  style={{ color: "var(--color-brand-600)" }}
                >
                  <span className="fw-semibold">
                    Discount Amount ({discount}%):
                  </span>
                  <span className="fw-bold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <hr style={{ borderColor: "var(--color-grey-200)" }} />

              {/* الشطب وإبراز السعر النهائي */}
              <div className="d-flex justify-content-between align-items-end mt-3">
                <span
                  className="fs-5 fw-bold mb-1"
                  style={{ color: "var(--color-grey-800)" }}
                >
                  Final Total:
                </span>
                <div className="text-end">
                  {discount > 0 && (
                    <span
                      className="d-block text-muted text-decoration-line-through mb-1"
                      style={{ fontSize: "1.1rem" }}
                    >
                      ${subTotal.toFixed(2)}
                    </span>
                  )}
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: "2.5rem",
                      lineHeight: "1",
                      color:
                        discount > 0
                          ? "var(--color-brand-600)"
                          : "var(--color-grey-900)",
                    }}
                  >
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
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
                To purchase{" "}
                <strong style={{ color: "var(--color-grey-900)" }}>
                  {discount > 0
                    ? "the complete bundle"
                    : "any of these courses"}
                </strong>
                , please contact the instructor directly. They will set up your
                student account and grant you instant access.
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
                className="btn w-100 fw-bold mt-4 d-flex justify-content-center align-items-center gap-2 shadow-sm"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  padding: "14px",
                  fontSize: "1.1rem",
                  transition: "transform 0.2s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <FaWhatsapp size={22} /> Contact via WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCourses;
