import {
  Outlet,
  useParams,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom"; // 👈 ضفنا NavLink هنا
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "../hooks/useTheme";
import { FaMoon, FaSun, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { getAcademyDetails } from "../services/tenantService";
import { supabase } from "../config/supabase";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";

const StudentLayout = () => {
  const { tenantId } = useParams();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

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

  if (isAcademyLoading || isAuthLoading)
    return (
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          color: "var(--color-grey-600)",
          backgroundColor: "var(--color-grey-50)",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{ backgroundColor: "var(--color-grey-50)", minHeight: "100vh" }}
    >
      <nav
        className="p-3 shadow-sm"
        style={{ backgroundColor: "var(--color-grey-0)" }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link
            to={`/${tenantId}`}
            className="text-decoration-none fw-bold fs-4"
            style={{ color: "var(--color-brand-600)" }}
          >
            {academy?.academy_name}
          </Link>

          <div className="d-none d-md-flex align-items-center gap-4">
            <NavLink
              to={`/${tenantId}`}
              end
              className="text-decoration-none"
              style={({ isActive }) => ({
                color: isActive
                  ? "var(--color-brand-600)"
                  : "var(--color-grey-700)",
                fontWeight: isActive ? "700" : "500",
                transition: "color 0.2s",
              })}
            >
              Home
            </NavLink>

            {!isStudentLoggedIn && (
              /* 🔴 Buy Courses NavLink */
              <NavLink
                to={`/${tenantId}/buy`}
                className="text-decoration-none"
                style={({ isActive }) => ({
                  color: "var(--color-brand-600)",
                  fontWeight: isActive ? "800" : "600",
                  opacity: isActive ? "1" : "0.8",
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

            {isStudentLoggedIn && (
              <NavLink
                to={`/${tenantId}/profile`}
                className="text-decoration-none"
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-brand-600)"
                    : "var(--color-grey-700)",
                  fontWeight: isActive ? "700" : "500",
                  transition: "color 0.2s",
                })}
              >
                My Profile
              </NavLink>
            )}
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={toggleTheme}
              className="btn border-0 me-2"
              style={{ color: "var(--color-grey-600)" }}
              title="Toggle Theme"
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {isStudentLoggedIn ? (
              <div className="d-flex align-items-center gap-1">
                <Link
                  to={`/${tenantId}/profile`}
                  className="btn border-0 d-flex align-items-center justify-content-center"
                  style={{ color: "var(--color-grey-700)" }}
                  title="My Profile"
                >
                  <FaUserCircle size={22} />
                </Link>

                <button
                  onClick={logout}
                  disabled={isLoggingOut}
                  className="btn border-0 text-danger d-flex align-items-center justify-content-center"
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
