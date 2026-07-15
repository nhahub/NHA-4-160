import { useParams, Link } from "react-router-dom";
import { useMyCourses } from "../../hooks/useMyCourses";
import { FaPlayCircle } from "react-icons/fa";

const MyCourses = () => {
  const { tenantId } = useParams();
  const { data: enrollments, isLoading } = useMyCourses(tenantId);

  if (isLoading)
    return (
      <div className="py-5 text-center fw-bold">Loading your courses...</div>
    );

  return (
    <div>
      <div className="mb-5">
        <h2 className="fw-bold" style={{ color: "var(--color-grey-900)" }}>
          My Learning
        </h2>
        <p style={{ color: "var(--color-grey-500)" }}>
          Courses you are currently enrolled in.
        </p>
      </div>

      {enrollments?.length === 0 ? (
        <div
          className="text-center p-5 rounded-3"
          style={{
            backgroundColor: "var(--color-grey-0)",
            border: "1px dashed var(--color-grey-300)",
          }}
        >
          <p className="fs-5 mb-0" style={{ color: "var(--color-grey-500)" }}>
            You haven't enrolled in any courses yet.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {enrollments?.map((enrollment) => {
            const course = enrollment.courses;
            if (!course) return null;
            return (
              <div key={course.id} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card h-100 shadow-sm border-0"
                  style={{ backgroundColor: "var(--color-grey-0)" }}
                >
                  <img
                    src={
                      course.thumbnail_url ||
                      "https://via.placeholder.com/300x150"
                    }
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <span
                      className="badge mb-2 align-self-start"
                      style={{
                        backgroundColor: "var(--color-brand-50)",
                        color: "var(--color-brand-700)",
                      }}
                    >
                      {course.category || "General"}
                    </span>
                    <h5
                      className="card-title fw-bold"
                      style={{ color: "var(--color-grey-900)" }}
                    >
                      {course.title}
                    </h5>

                    <div className="mt-auto pt-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small
                          className="fw-medium"
                          style={{ color: "var(--color-grey-600)" }}
                        >
                          Progress
                        </small>
                        <small
                          className="fw-bold"
                          style={{ color: "var(--color-brand-600)" }}
                        >
                          {enrollment.progress}%
                        </small>
                      </div>
                      <div className="progress mb-3" style={{ height: "6px" }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${enrollment.progress}%`,
                            backgroundColor: "var(--color-brand-600)",
                          }}
                        ></div>
                      </div>
                      <Link
                        to={`/${tenantId}/learn/${course.id}`}
                        className="btn w-100 fw-bold d-flex justify-content-center align-items-center gap-2"
                        style={{
                          backgroundColor: "var(--color-grey-100)",
                          color: "var(--color-grey-800)",
                        }}
                      >
                        <FaPlayCircle />{" "}
                        {enrollment.progress === 0
                          ? "Start Course"
                          : "Continue"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
