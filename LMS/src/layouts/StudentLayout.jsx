import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { Placeholder } from "react-bootstrap";
import {
  FaMoon,
  FaSun,
  FaUserCircle,
  FaSignOutAlt,
  FaSearch,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useStudentLayout } from "../hooks/useStudentLayout";

const StudentLayout = () => {
  const navigate = useNavigate();
  const {
    tenantId,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    academy,
    adminData,
    isStudentLoggedIn,
    logout,
    isLoggingOut,
    isLoading,
  } = useStudentLayout();

  if (isLoading) {
    return (
      <div
        className="d-flex flex-column min-vh-100"
        style={{ backgroundColor: "var(--color-grey-50)" }}
      >
        <nav
          className="p-3 shadow-sm sticky-top"
          style={{ backgroundColor: "var(--color-grey-0)", zIndex: 1000 }}
        >
          <div className="container d-flex justify-content-between align-items-center gap-3">
            <Placeholder as="div" animation="glow">
              <Placeholder
                className="rounded"
                style={{
                  width: "150px",
                  height: "32px",
                  backgroundColor: "var(--color-grey-200)",
                }}
              />
            </Placeholder>
            <div
              className="d-none d-md-block position-relative flex-grow-1 mx-lg-4"
              style={{ maxWidth: "450px" }}
            >
              <Placeholder as="div" animation="glow">
                <Placeholder
                  className="rounded-pill w-100"
                  style={{
                    height: "42px",
                    backgroundColor: "var(--color-grey-100)",
                  }}
                />
              </Placeholder>
            </div>
            <div className="d-none d-lg-flex gap-4">
              <Placeholder as="div" animation="glow">
                <Placeholder
                  className="rounded"
                  style={{
                    width: "60px",
                    height: "24px",
                    backgroundColor: "var(--color-grey-200)",
                  }}
                />
              </Placeholder>
              <Placeholder as="div" animation="glow">
                <Placeholder
                  className="rounded"
                  style={{
                    width: "60px",
                    height: "24px",
                    backgroundColor: "var(--color-grey-200)",
                  }}
                />
              </Placeholder>
            </div>
          </div>
        </nav>
        <main className="container py-4 py-md-5 flex-grow-1"></main>
        <footer
          className="py-5 border-top mt-auto"
          style={{
            backgroundColor: "var(--color-grey-0)",
            borderColor: "var(--color-grey-200) !important",
          }}
        >
          <div className="container text-center">
            <Placeholder as="div" animation="glow">
              <Placeholder
                className="rounded mb-3"
                style={{
                  width: "200px",
                  height: "28px",
                  backgroundColor: "var(--color-grey-300)",
                }}
              />
              <br />
              <Placeholder
                className="rounded"
                style={{
                  width: "300px",
                  height: "20px",
                  backgroundColor: "var(--color-grey-200)",
                }}
              />
            </Placeholder>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "var(--color-grey-50)" }}
    >
      <nav
        className="p-3 shadow-sm sticky-top"
        style={{ backgroundColor: "var(--color-grey-0)", zIndex: 1000 }}
      >
        <div className="container d-flex justify-content-between align-items-center gap-3">
          <Link
            to={isStudentLoggedIn ? `/${tenantId}/my-courses` : `/${tenantId}`}
            className="text-decoration-none fw-bold fs-4 text-truncate"
            style={{
              color: "var(--color-brand-600)",
              maxWidth: "150px",
              whiteSpace: "nowrap",
            }}
          >
            {academy?.academy_name}
          </Link>

          <div
            className="d-none d-md-flex position-relative flex-grow-1 mx-lg-4"
            style={{ maxWidth: "450px" }}
          >
            <FaSearch
              className="position-absolute top-50 translate-middle-y ms-3"
              style={{ color: "var(--color-grey-400)", zIndex: 10 }}
            />
            <input
              type="text"
              className="form-control rounded-pill shadow-none"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: "var(--color-grey-50)",
                borderColor: "var(--color-grey-200)",
                color: "var(--color-grey-900)",
                paddingLeft: "2.5rem",
                paddingTop: "0.6rem",
                paddingBottom: "0.6rem",
                transition: "all 0.2s",
              }}
            />
          </div>

          <div className="d-none d-lg-flex align-items-center gap-4">
            {!isStudentLoggedIn && (
              <NavLink
                to={`/${tenantId}`}
                end
                className="text-decoration-none"
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-brand-600)"
                    : "var(--color-grey-700)",
                  fontWeight: isActive ? "700" : "500",
                  borderBottom: isActive
                    ? "2px solid var(--color-brand-600)"
                    : "none",
                  paddingBottom: isActive ? "2px" : "0",
                  transition: "all 0.2s",
                })}
              >
                Home
              </NavLink>
            )}

            {isStudentLoggedIn && (
              <NavLink
                to={`/${tenantId}/my-courses`}
                className="text-decoration-none"
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-brand-600)"
                    : "var(--color-grey-700)",
                  fontWeight: isActive ? "700" : "500",
                  borderBottom: isActive
                    ? "2px solid var(--color-brand-600)"
                    : "none",
                  paddingBottom: isActive ? "2px" : "0",
                  transition: "all 0.2s",
                })}
              >
                My Learning
              </NavLink>
            )}
            <NavLink
              to={`/${tenantId}/about`}
              className="text-decoration-none"
              style={({ isActive }) => ({
                color: isActive
                  ? "var(--color-brand-600)"
                  : "var(--color-grey-700)",
                fontWeight: isActive ? "700" : "500",
                borderBottom: isActive
                  ? "2px solid var(--color-brand-600)"
                  : "none",
                paddingBottom: isActive ? "2px" : "0",
                transition: "all 0.2s",
              })}
            >
              About
            </NavLink>

            {!isStudentLoggedIn && (
              <NavLink
                to={`/${tenantId}/buy`}
                className="text-decoration-none"
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-brand-600)"
                    : "var(--color-grey-700)",
                  fontWeight: isActive ? "700" : "500",
                  borderBottom: isActive
                    ? "2px solid var(--color-brand-600)"
                    : "none",
                  paddingBottom: isActive ? "2px" : "0",
                  transition: "all 0.2s",
                })}
              >
                Buy Courses
              </NavLink>
            )}
          </div>

          <div className="d-flex align-items-center gap-1 gap-md-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="btn border-0 p-2"
              style={{ color: "var(--color-grey-600)" }}
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {isStudentLoggedIn ? (
              <div className="d-flex align-items-center gap-1">
                <Link
                  to={`/${tenantId}/profile`}
                  className="btn border-0 text-secondary p-2"
                  title="My Profile"
                >
                  <FaUserCircle size={22} />
                </Link>
                <button
                  onClick={logout}
                  disabled={isLoggingOut}
                  className="btn border-0 text-danger p-2"
                  title="Logout"
                >
                  <FaSignOutAlt size={22} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate(`/login?academy=${tenantId}`)}
                className="btn fw-bold d-none d-sm-block"
                style={{
                  backgroundColor: "var(--color-brand-600)",
                  color: "var(--color-blue-text)",
                  padding: "8px 20px",
                  borderRadius: "8px",
                }}
              >
                Login
              </button>
            )}

            <button
              className="btn border-0 p-2 d-lg-none"
              style={{ color: "var(--color-grey-800)" }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FaBars size={22} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="d-block d-md-none p-3 shadow-sm border-bottom"
        style={{ backgroundColor: "var(--color-grey-0)", zIndex: 999 }}
      >
        <div className="position-relative w-100">
          <FaSearch
            className="position-absolute top-50 translate-middle-y ms-3"
            style={{ color: "var(--color-grey-400)", zIndex: 10 }}
          />
          <input
            type="text"
            className="form-control rounded-pill shadow-none w-100"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: "var(--color-grey-50)",
              borderColor: "var(--color-grey-200)",
              color: "var(--color-grey-900)",
              paddingLeft: "2.5rem",
              paddingTop: "0.6rem",
              paddingBottom: "0.6rem",
            }}
          />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed-top vw-100 vh-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <div
        className="fixed-top vh-100 shadow-lg d-flex flex-column"
        style={{
          width: "280px",
          backgroundColor: "var(--color-grey-0)",
          zIndex: 1050,
          right: 0,
          left: "auto",
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="p-4 flex-grow-1 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <span
              className="fw-bold fs-5 text-truncate"
              style={{ color: "var(--color-grey-900)", maxWidth: "180px" }}
            >
              {academy?.academy_name}
            </span>
            <button
              className="btn border-0 p-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes size={24} style={{ color: "var(--color-grey-600)" }} />
            </button>
          </div>

          <div className="d-flex flex-column gap-4 fs-5">
            {!isStudentLoggedIn && (
              <NavLink
                to={`/${tenantId}`}
                end
                className="text-decoration-none fw-semibold"
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-brand-600)"
                    : "var(--color-grey-800)",
                })}
              >
                Home
              </NavLink>
            )}

            {isStudentLoggedIn && (
              <NavLink
                to={`/${tenantId}/my-courses`}
                className="text-decoration-none fw-semibold"
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-brand-600)"
                    : "var(--color-grey-800)",
                })}
              >
                My Learning
              </NavLink>
            )}

            <NavLink
              to={`/${tenantId}/about`}
              className="text-decoration-none fw-semibold"
              style={({ isActive }) => ({
                color: isActive
                  ? "var(--color-brand-600)"
                  : "var(--color-grey-800)",
              })}
            >
              About
            </NavLink>

            {!isStudentLoggedIn && (
              <NavLink
                to={`/${tenantId}/buy`}
                className="text-decoration-none fw-semibold"
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-brand-600)"
                    : "var(--color-grey-800)",
                })}
              >
                Buy Courses
              </NavLink>
            )}

            {!isStudentLoggedIn && (
              <button
                onClick={() => navigate(`/login?academy=${tenantId}`)}
                className="btn fw-bold mt-auto w-100"
                style={{
                  backgroundColor: "var(--color-brand-600)",
                  color: "var(--color-blue-text)",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="container py-4 py-md-5 flex-grow-1">
        <Outlet />
      </main>

      <footer
        className="py-5 border-top mt-auto"
        style={{
          backgroundColor: "var(--color-grey-0)",
          borderColor: "var(--color-grey-200) !important",
        }}
      >
        <div className="container text-center">
          <h4
            className="fw-bold mb-3"
            style={{ color: "var(--color-grey-900)" }}
          >
            {adminData?.name || "Instructor"}
          </h4>
          <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap mb-4">
            {adminData?.email && (
              <div
                className="d-flex align-items-center gap-2"
                style={{ color: "var(--color-grey-600)" }}
              >
                <FaEnvelope style={{ color: "var(--color-brand-500)" }} />
                <span>{adminData.email}</span>
              </div>
            )}
            {adminData?.phone && (
              <div
                className="d-flex align-items-center gap-2"
                style={{ color: "var(--color-grey-600)" }}
              >
                <FaPhone style={{ color: "var(--color-brand-500)" }} />
                <span>{adminData.phone}</span>
              </div>
            )}
          </div>
          <p className="small mb-0" style={{ color: "var(--color-grey-400)" }}>
            &copy; {new Date().getFullYear()}{" "}
            {adminData?.tenants?.academy_name || "Academy"}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudentLayout;
