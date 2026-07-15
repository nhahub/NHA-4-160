import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseCurriculum } from "../../services/courseService";
import { FaLock, FaPlayCircle, FaUnlock, FaShoppingCart } from "react-icons/fa";
import { supabase } from "../../config/supabase";

const CourseDetails = () => {
  const { tenantId, courseId } = useParams();

  const { data: course, isLoading: isCourseLoading } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => getCourseCurriculum(courseId),
  });

  const { data: currentUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["studentUser"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

  const { data: isEnrolled, isLoading: isEnrollmentLoading } = useQuery({
    queryKey: ["checkEnrollment", courseId, currentUser?.id],
    queryFn: async () => {
      if (!currentUser) return false;
      const { data, error } = await supabase
        .from("enrollments")
        .select("id")
        .eq("student_id", currentUser.id)
        .eq("course_id", courseId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!currentUser,
  });

  const isStudentLoggedIn = !!currentUser;

  if (isCourseLoading || isUserLoading || isEnrollmentLoading)
    return (
      <div className="py-5 text-center fw-bold text-muted">
        Loading course details...
      </div>
    );

  return (
    <div className="row g-5">
      <div className="col-lg-8">
        <h1 className="fw-bold mb-3" style={{ color: "var(--color-grey-900)" }}>
          {course.title}
        </h1>
        <p className="fs-5 mb-4" style={{ color: "var(--color-grey-600)" }}>
          {course.description}
        </p>

        <h3 className="fw-bold mb-4" style={{ color: "var(--color-grey-800)" }}>
          Course Syllabus
        </h3>

        {course.sections
          ?.sort((a, b) => a.section_order - b.section_order)
          .map((section) => (
            <div
              key={section.id}
              className="card mb-3 border-0 shadow-sm"
              style={{ backgroundColor: "var(--color-grey-0)" }}
            >
              <div
                className="card-header border-0 fw-bold fs-5 py-3"
                style={{
                  backgroundColor: "var(--color-grey-50)",
                  color: "var(--color-grey-800)",
                }}
              >
                {section.title}
              </div>
              <ul className="list-group list-group-flush">
                {section.lessons
                  ?.sort((a, b) => a.lesson_order - b.lesson_order)
                  .map((lesson) => (
                    <li
                      key={lesson.id}
                      className="list-group-item d-flex justify-content-between align-items-center py-3"
                      style={{
                        backgroundColor: "var(--color-grey-0)",
                        color: "var(--color-grey-600)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <FaPlayCircle size={16} />
                        <span>{lesson.title}</span>
                      </div>

                      {isEnrolled ? (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: "var(--color-brand-50)",
                            color: "var(--color-brand-600)",
                          }}
                        >
                          Unlocked
                        </span>
                      ) : (
                        <FaLock
                          size={14}
                          style={{ color: "var(--color-grey-400)" }}
                        />
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>

      <div className="col-lg-4">
        <div
          className="card shadow-sm border-0 sticky-top"
          style={{ top: "100px", backgroundColor: "var(--color-grey-0)" }}
        >
          <img
            src={course.thumbnail_url || "https://via.placeholder.com/400x200"}
            className="card-img-top"
            alt="Course Thumbnail"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body p-4 text-center">
            <h2
              className="fw-bold mb-3"
              style={{ color: "var(--color-grey-900)" }}
            >
              ${Number(course.price).toFixed(2)}
            </h2>

            {!isStudentLoggedIn ? (
              <>
                <Link
                  to={`/login?academy=${tenantId}`}
                  className="btn w-100 fw-bold py-2 mb-2"
                  style={{
                    backgroundColor: "var(--color-brand-600)",
                    color: "var(--color-blue-text)",
                  }}
                >
                  Login to Enroll
                </Link>
                <p
                  className="small mt-2"
                  style={{ color: "var(--color-grey-500)" }}
                >
                  You need an account to view this course.
                </p>
              </>
            ) : isEnrolled ? (
              <>
                <Link
                  to={`/${tenantId}/learn/${courseId}`}
                  className="btn w-100 fw-bold py-2 mb-2 d-flex justify-content-center align-items-center gap-2"
                  style={{
                    backgroundColor: "var(--color-brand-600)",
                    color: "var(--color-blue-text)",
                  }}
                >
                  <FaUnlock /> Start Learning
                </Link>
                <p className="small mt-2 text-success fw-medium">
                  You are enrolled in this course.
                </p>
              </>
            ) : (
              <>
                <Link
                  to={`/${tenantId}/buy`}
                  className="btn w-100 fw-bold py-2 mb-2 d-flex justify-content-center align-items-center gap-2"
                  style={{
                    backgroundColor: "var(--color-grey-200)",
                    color: "var(--color-grey-800)",
                  }}
                >
                  <FaShoppingCart /> Buy This Course
                </Link>
                <p
                  className="small mt-2"
                  style={{ color: "var(--color-grey-500)" }}
                >
                  You are not enrolled. Contact the admin to purchase.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
