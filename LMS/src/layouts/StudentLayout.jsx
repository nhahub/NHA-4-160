import {
  Outlet,
  useParams,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../hooks/useTheme";
import {
  FaMoon,
  FaSun,
  FaUserCircle,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { getAcademyDetails } from "../services/tenantService";
import { supabase } from "../config/supabase";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";

const StudentLayout = () => {
  const { tenantId } = useParams();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: academy, isLoading: isAcademyLoading } = useQuery({
    queryKey: ["academy", tenantId],
    queryFn: () => getAcademyDetails(tenantId),
  });

  const { logout, isLoading: isLoggingOut } = useLogout(`/${tenantId}`);
  const [session, setSession] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isStudentLoggedIn = !!session;

  useEffect(() => {
    const handler = setTimeout(() => {
      const basePath = isStudentLoggedIn
        ? `/${tenantId}/my-courses`
        : `/${tenantId}`;

      if (searchQuery.trim()) {
        navigate(
          `${basePath}?search=${encodeURIComponent(searchQuery.trim())}`,
        );
      } else if (searchQuery === "" && location.search.includes("search=")) {
        navigate(basePath);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery, navigate, tenantId, location.search, isStudentLoggedIn]);

  if (isAcademyLoading || isAuthLoading)
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        Loading...
      </div>
    );

  return (
    <div
      style={{ backgroundColor: "var(--color-grey-50)", minHeight: "100vh" }}
    >
      <nav
        className="p-3 shadow-sm sticky-top"
        style={{ backgroundColor: "var(--color-grey-0)", zIndex: 1000 }}
      >
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
          <Link
            to={isStudentLoggedIn ? `/${tenantId}/my-courses` : `/${tenantId}`}
            className="text-decoration-none fw-bold fs-4"
            style={{ color: "var(--color-brand-600)" }}
          >
            {academy?.academy_name}
          </Link>

          <div
            className="position-relative d-flex flex-grow-1 mx-md-4"
            style={{ maxWidth: "450px" }}
          >
            <FaSearch
              className="position-absolute top-50 translate-middle-y ms-3"
              style={{ color: "var(--color-grey-400)", zIndex: 10 }}
            />
            <input
              type="text"
              className="form-control rounded-pill shadow-none"
              placeholder="Search courses by name or category..."
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

          <div className="d-none d-md-flex align-items-center gap-4">
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

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={toggleTheme}
              className="btn border-0 me-2"
              style={{ color: "var(--color-grey-600)" }}
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {isStudentLoggedIn ? (
              <div className="d-flex align-items-center gap-1">
                <Link
                  to={`/${tenantId}/profile`}
                  className="btn border-0 text-secondary"
                  title="My Profile"
                >
                  <FaUserCircle size={22} />
                </Link>
                <button
                  onClick={logout}
                  disabled={isLoggingOut}
                  className="btn border-0 text-danger"
                  title="Logout"
                >
                  <FaSignOutAlt size={22} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate(`/login?academy=${tenantId}`)}
                className="btn fw-bold"
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
          </div>
        </div>
      </nav>

      <main className="container py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
