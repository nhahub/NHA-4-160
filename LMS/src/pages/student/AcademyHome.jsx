import { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Placeholder } from "react-bootstrap";
import { usePublishedCourses } from "../../hooks/usePublishedCourses";
import { useTenantCategories } from "../../hooks/useCategories";
import { supabase } from "../../config/supabase";

const AcademyHome = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate(`/${tenantId}/my-courses`, { replace: true });
      }
    });
  }, [navigate, tenantId]);

  const { data: courses, isLoading: isCoursesLoading } =
    usePublishedCourses(tenantId);
  const { data: categoriesList, isLoading: isCatsLoading } =
    useTenantCategories(tenantId);

  if (isCoursesLoading || isCatsLoading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1 pb-5">
          <div className="text-center mb-4 mb-md-5 px-3">
            <Placeholder as="h1" animation="glow" className="display-5 mb-3">
              <Placeholder
                xs={8}
                md={4}
                className="rounded-3"
                style={{
                  backgroundColor: "var(--color-grey-200)",
                  height: "48px",
                }}
              />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="fs-5">
              <Placeholder
                xs={6}
                md={3}
                className="rounded-3"
                style={{
                  backgroundColor: "var(--color-grey-100)",
                  height: "24px",
                }}
              />
            </Placeholder>
          </div>

          <div className="d-flex justify-content-center gap-2 mb-4 px-3 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <Placeholder.Button
                key={i}
                xs={3}
                md={1}
                aria-hidden="true"
                className="rounded-pill py-2 border-0"
                style={{
                  backgroundColor: "var(--color-grey-200)",
                  cursor: "default",
                  height: "40px",
                }}
              />
            ))}
          </div>

          <div className="row g-4 px-2 px-md-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card h-100 shadow-sm border-0 d-flex flex-column"
                  style={{
                    backgroundColor: "var(--color-grey-0)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Placeholder as="div" animation="glow">
                    <Placeholder
                      className="w-100"
                      style={{
                        height: "200px",
                        backgroundColor: "var(--color-grey-100)",
                      }}
                    />
                  </Placeholder>
                  <div className="card-body d-flex flex-column flex-grow-1 p-4">
                    <Placeholder
                      as="div"
                      animation="glow"
                      className="mb-3 align-self-start w-100"
                    >
                      <Placeholder
                        xs={3}
                        className="rounded-pill py-2"
                        style={{ backgroundColor: "var(--color-grey-200)" }}
                      />
                    </Placeholder>
                    <Placeholder as="h5" animation="glow" className="mb-3">
                      <Placeholder
                        xs={9}
                        className="rounded-2"
                        style={{
                          backgroundColor: "var(--color-grey-300)",
                          height: "24px",
                        }}
                      />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="mb-4">
                      <Placeholder
                        xs={12}
                        className="rounded-2 mb-1"
                        style={{ backgroundColor: "var(--color-grey-200)" }}
                      />
                      <Placeholder
                        xs={12}
                        className="rounded-2 mb-1"
                        style={{ backgroundColor: "var(--color-grey-200)" }}
                      />
                      <Placeholder
                        xs={8}
                        className="rounded-2"
                        style={{ backgroundColor: "var(--color-grey-200)" }}
                      />
                    </Placeholder>
                    <div
                      className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top"
                      style={{
                        borderColor: "var(--color-grey-100) !important",
                      }}
                    >
                      <Placeholder as="div" animation="glow" className="w-25">
                        <Placeholder
                          xs={10}
                          className="rounded-2"
                          style={{
                            height: "24px",
                            backgroundColor: "var(--color-grey-300)",
                          }}
                        />
                      </Placeholder>
                      <Placeholder.Button
                        xs={4}
                        aria-hidden="true"
                        className="border-0"
                        style={{
                          backgroundColor: "var(--color-grey-200)",
                          borderRadius: "8px",
                          padding: "6px 12px",
                          cursor: "default",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isAcademyEmpty =
    courses?.length === 0 && !searchQuery && selectedCategory === "All";

  if (isAcademyEmpty) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center px-3"
        style={{ minHeight: "40vh" }}
      >
        <h2
          className="fw-bold mb-3 text-center"
          style={{ color: "var(--color-grey-900)" }}
        >
          Welcome to Our Academy
        </h2>
        <p
          className="fs-5 text-center"
          style={{ color: "var(--color-grey-500)", maxWidth: "500px" }}
        >
          There are no courses available right now. Please check back later!
        </p>
      </div>
    );
  }

  const categories = ["All", ...(categoriesList?.map((c) => c.name) || [])];

  const filteredCourses = courses?.filter((c) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (c.category || "General") === selectedCategory;

    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery) ||
      (c.description || "").toLowerCase().includes(searchQuery) ||
      (c.category || "General").toLowerCase().includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 pb-5">
        <div className="text-center mb-4 mb-md-5 px-3">
          <h1
            className="fw-bold display-5 mb-3"
            style={{ color: "var(--color-grey-900)" }}
          >
            Explore Our Courses
          </h1>
          {searchQuery ? (
            <p
              className="fs-5"
              style={{ color: "var(--color-brand-600)", fontWeight: "bold" }}
            >
              Search results for: "{searchQuery}"
            </p>
          ) : (
            <p className="fs-5" style={{ color: "var(--color-grey-500)" }}>
              Find the right course for your career.
            </p>
          )}
        </div>

        <div className="d-flex justify-content-center gap-2 mb-4 px-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn rounded-pill px-3 px-md-4 py-2 fw-medium"
              style={{
                backgroundColor:
                  selectedCategory === cat
                    ? "var(--color-brand-600)"
                    : "var(--color-grey-200)",
                color:
                  selectedCategory === cat
                    ? "var(--color-blue-text)"
                    : "var(--color-grey-700)",
                fontSize: "0.95rem",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredCourses?.length === 0 ? (
          <div className="text-center py-5 px-3">
            <h4 style={{ color: "var(--color-grey-500)" }}>
              No courses found matching your criteria.
            </h4>
          </div>
        ) : (
          <div className="row g-4 px-2 px-md-0">
            {filteredCourses?.map((course) => (
              <div key={course.id} className="col-12 col-md-6 col-lg-4">
                <Link
                  to={`/${tenantId}/course/${course.id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card h-100 shadow-sm border-0 d-flex flex-column"
                    style={{
                      backgroundColor: "var(--color-grey-0)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    }}
                  >
                    <img
                      src={
                        course.thumbnail_url ||
                        "https://via.placeholder.com/300x150"
                      }
                      className="card-img-top w-100"
                      alt={course.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column flex-grow-1 p-4">
                      <span
                        className="badge mb-3 align-self-start"
                        style={{
                          backgroundColor: "var(--color-brand-50)",
                          color: "var(--color-brand-700)",
                          padding: "6px 12px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {course.category || "General"}
                      </span>
                      <h5
                        className="card-title fw-bold mb-2"
                        style={{ color: "var(--color-grey-900)" }}
                      >
                        {course.title}
                      </h5>
                      <p
                        className="card-text small mb-4"
                        style={{
                          color: "var(--color-grey-500)",
                          display: "-webkit-box",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {course.description}
                      </p>
                      <div
                        className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top"
                        style={{
                          borderColor: "var(--color-grey-100) !important",
                        }}
                      >
                        <span
                          className="fw-bold fs-5"
                          style={{ color: "var(--color-brand-600)" }}
                        >
                          ${course.price}
                        </span>
                        <span
                          className="btn btn-sm fw-bold px-3 py-2"
                          style={{
                            color: "var(--color-brand-600)",
                            backgroundColor: "var(--color-brand-50)",
                            borderRadius: "8px",
                          }}
                        >
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademyHome;
