import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPlayCircle, FaArrowLeft } from "react-icons/fa";
import { useCoursePlayer, useToggleLesson } from "../../hooks/useCoursePlayer";

const CoursePlayer = () => {
  const { tenantId, courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState(null);

  const { data, isLoading } = useCoursePlayer(courseId, tenantId);
  const { mutate: toggleLesson } = useToggleLesson(courseId);

  const course = data?.course;
  const enrollment = data?.enrollment;
  const instructorName = data?.instructorName;
  const completedLessons = enrollment?.completed_lessons || [];

  const totalLessons = useMemo(() => {
    if (!course?.sections) return 0;
    return course.sections.reduce(
      (acc, section) => acc + (section.lessons?.length || 0),
      0,
    );
  }, [course]);

  useEffect(() => {
    if (course?.sections && !activeLesson) {
      const firstSection = course.sections.sort(
        (a, b) => a.section_order - b.section_order,
      )[0];
      const firstLesson = firstSection?.lessons?.sort(
        (a, b) => a.lesson_order - b.lesson_order,
      )[0];
      if (firstLesson) setActiveLesson(firstLesson);
    }
  }, [course, activeLesson]);

  const handleToggleComplete = (lessonId) => {
    if (!enrollment) return;

    let newCompleted;
    if (completedLessons.includes(lessonId)) {
      newCompleted = completedLessons.filter((id) => id !== lessonId);
    } else {
      newCompleted = [...completedLessons, lessonId];
    }

    const newProgress =
      totalLessons === 0
        ? 0
        : Math.round((newCompleted.length / totalLessons) * 100);

    toggleLesson({
      enrollmentId: enrollment.id,
      newCompletedLessons: newCompleted,
      newProgress: newProgress,
    });
  };

  if (isLoading)
    return (
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          color: "var(--color-grey-900)",
          backgroundColor: "var(--color-grey-50)",
        }}
      >
        Loading Player...
      </div>
    );

  return (
    <div
      className="container-fluid p-0"
      style={{ backgroundColor: "var(--color-grey-50)", minHeight: "100vh" }}
    >
      <div
        className="p-3 shadow-sm d-flex justify-content-between align-items-center border-bottom"
        style={{
          backgroundColor: "var(--color-grey-0)",
          borderColor: "var(--color-grey-200)",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <Link
            to={`/${tenantId}`}
            className="text-decoration-none fw-semibold"
            style={{ color: "var(--color-brand-600)" }}
          >
            <FaArrowLeft className="me-2" /> Back to Academy
          </Link>
          <h5
            className="mb-0 ms-3 border-start ps-3 fw-bold d-none d-sm-block"
            style={{
              borderColor: "var(--color-grey-200) !important",
              color: "var(--color-grey-900)",
            }}
          >
            {course?.title}
          </h5>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span
            className="small d-none d-sm-block fw-medium"
            style={{ color: "var(--color-grey-700)" }}
          >
            Your Progress
          </span>
          <div
            className="progress"
            style={{
              width: "120px",
              height: "8px",
              backgroundColor: "var(--color-grey-200)",
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${enrollment?.progress || 0}%`,
                backgroundColor: "var(--color-brand-600)",
              }}
            ></div>
          </div>
          <span className="fw-bold" style={{ color: "var(--color-grey-900)" }}>
            {enrollment?.progress || 0}%
          </span>
        </div>
      </div>

      <div className="row g-0">
        <div
          className="col-lg-8 col-xl-9 border-end"
          style={{ borderColor: "var(--color-grey-200) !important" }}
        >
          <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ aspectRatio: "16/9", backgroundColor: "#000" }}
          >
            {activeLesson?.video_url ? (
              <video
                src={activeLesson.video_url}
                controls
                autoPlay
                className="w-100 h-100"
                controlsList="nodownload"
              />
            ) : (
              <p style={{ color: "#ffffff" }}>
                Select a lesson to start watching
              </p>
            )}
          </div>

          <div
            className="p-4 p-md-5"
            style={{ backgroundColor: "var(--color-grey-0)" }}
          >
            <h2
              className="fw-bold mb-2"
              style={{ color: "var(--color-grey-900)" }}
            >
              {activeLesson?.title}
            </h2>

            <p
              className="fw-semibold mb-4"
              style={{ color: "var(--color-brand-600)" }}
            >
              Instructor:{" "}
              <span className="text-decoration-underline">
                {instructorName}
              </span>
            </p>

            <h5
              className="fw-bold border-bottom pb-2 mb-3"
              style={{
                color: "var(--color-grey-900)",
                borderColor: "var(--color-grey-200) !important",
              }}
            >
              About this course
            </h5>
            <p style={{ color: "var(--color-grey-600)", lineHeight: "1.8" }}>
              {course?.description}
            </p>
          </div>
        </div>

        <div
          className="col-lg-4 col-xl-3"
          style={{
            height: "calc(100vh - 65px)",
            overflowY: "auto",
            backgroundColor: "var(--color-grey-0)",
          }}
        >
          <div
            className="p-3 fw-bold fs-5 border-bottom"
            style={{
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-900)",
              borderColor: "var(--color-grey-200) !important",
            }}
          >
            Course Content
          </div>

          <div className="accordion accordion-flush" id="courseAccordion">
            {course?.sections
              ?.sort((a, b) => a.section_order - b.section_order)
              .map((section, index) => (
                <div
                  className="accordion-item border-bottom"
                  key={section.id}
                  style={{
                    borderColor: "var(--color-grey-200) !important",
                    backgroundColor: "transparent",
                  }}
                >
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${section.id}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      style={{
                        backgroundColor: "var(--color-grey-50)",
                        color: "var(--color-grey-900)",
                        boxShadow: "none",
                      }}
                    >
                      {section.title}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${section.id}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                  >
                    <div className="accordion-body p-0">
                      <div className="list-group list-group-flush">
                        {section.lessons
                          ?.sort((a, b) => a.lesson_order - b.lesson_order)
                          .map((lesson) => {
                            const isCompleted = completedLessons.includes(
                              lesson.id,
                            );
                            const isPlaying = activeLesson?.id === lesson.id;

                            return (
                              <div
                                key={lesson.id}
                                className="list-group-item d-flex align-items-center justify-content-between p-3 border-0 border-bottom"
                                style={{
                                  cursor: "pointer",
                                  transition: "background-color 0.2s",
                                  backgroundColor: isPlaying
                                    ? "var(--color-grey-100)"
                                    : "var(--color-grey-0)",
                                  borderColor:
                                    "var(--color-grey-200) !important",
                                }}
                              >
                                <div
                                  className="d-flex align-items-start gap-3 flex-grow-1"
                                  onClick={() => setActiveLesson(lesson)}
                                >
                                  <div className="mt-1">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={isCompleted}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        handleToggleComplete(lesson.id);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        accentColor: "var(--color-brand-600)",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <p
                                      className={`mb-0 fw-medium ${isCompleted ? "text-decoration-line-through" : ""}`}
                                      style={{
                                        color: isCompleted
                                          ? "var(--color-grey-500)"
                                          : "var(--color-grey-900)",
                                      }}
                                    >
                                      {lesson.title}
                                    </p>
                                    <small
                                      className="d-flex align-items-center gap-1 mt-1"
                                      style={{ color: "var(--color-grey-500)" }}
                                    >
                                      <FaPlayCircle /> Video
                                    </small>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
