import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublishedCourses } from "../../services/courseService";

const AcademyHome = () => {
  const { tenantId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: courses, isLoading } = useQuery({
    queryKey: ["publishedCourses", tenantId],
    queryFn: () => getPublishedCourses(tenantId),
  });

  if (isLoading) return <div>Loading courses...</div>;

  const categories = [
    "All",
    ...new Set(courses?.map((c) => c.category || "General")),
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => (c.category || "General") === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "var(--color-grey-900)" }}>
          Explore Our Courses
        </h1>
        <p style={{ color: "var(--color-grey-500)" }}>
          Find the right course for your career.
        </p>
      </div>

      {/* Category Filter */}
      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="btn rounded-pill px-4 fw-medium"
            style={{
              backgroundColor:
                selectedCategory === cat
                  ? "var(--color-brand-600)"
                  : "var(--color-grey-200)",
              color:
                selectedCategory === cat
                  ? "var(--color-blue-text)"
                  : "var(--color-grey-700)",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="row g-4">
        {filteredCourses?.map((course) => (
          <div key={course.id} className="col-12 col-md-6 col-lg-4">
            <Link
              to={`/${tenantId}/course/${course.id}`}
              className="text-decoration-none"
            >
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  backgroundColor: "var(--color-grey-0)",
                  transition: "transform 0.2s",
                }}
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
                <div className="card-body">
                  <span
                    className="badge mb-2"
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
                  <p
                    className="card-text small text-truncate"
                    style={{ color: "var(--color-grey-500)" }}
                  >
                    {course.description}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center pb-3">
                  <span
                    className="fw-bold fs-5"
                    style={{ color: "var(--color-brand-600)" }}
                  >
                    ${course.price}
                  </span>
                  <span
                    className="btn btn-sm btn-outline-primary fw-bold"
                    style={{
                      color: "var(--color-brand-600)",
                      borderColor: "var(--color-brand-600)",
                    }}
                  >
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademyHome;
