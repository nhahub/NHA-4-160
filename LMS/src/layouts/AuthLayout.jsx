import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import {
  FaSun,
  FaMoon,
  FaChalkboardTeacher,
  FaCheckCircle,
} from "react-icons/fa";

const AuthLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: "var(--color-grey-50)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="container">
        <nav className="py-4 d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className="fw-bold fs-4 text-decoration-none d-flex align-items-center gap-2"
            style={{ color: "var(--color-brand-600)" }}
          >
            <FaChalkboardTeacher />
            TeachBase
          </Link>
          <button
            onClick={toggleTheme}
            className="btn btn-link d-flex align-items-center justify-content-center p-0"
            style={{
              color: "var(--color-grey-700)",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </div>

      <div className="container flex-grow-1 d-flex align-items-center pb-5">
        <div className="row w-100 g-5 align-items-center justify-content-center m-0">
          {/* Outlet replaces children to render nested routes like Login or Register */}
          <div className="col-12 col-lg-5 p-0 p-sm-3">
            <Outlet />
          </div>

          <div className="col-12 col-lg-6 offset-lg-1 d-none d-lg-block">
            {/* تم إزالة البوردر، الشادو، والخلفية من هنا لدمج النص مع الصفحة */}
            <div className="p-4 p-lg-5">
              <h2
                className="fw-bold mb-4"
                style={{ color: "var(--color-grey-900)" }}
              >
                Everything you need to run your academy
              </h2>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <FaCheckCircle
                    style={{
                      color: "var(--color-brand-500)",
                      fontSize: "1.5rem",
                      marginTop: "2px",
                    }}
                  />
                  <div>
                    <h5
                      className="fw-bold mb-1"
                      style={{ color: "var(--color-grey-800)" }}
                    >
                      White-labeled Platform
                    </h5>
                    <p
                      className="mb-0"
                      style={{ color: "var(--color-grey-500)" }}
                    >
                      Your own brand, logo, and colors. No marketplace
                      distractions.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <FaCheckCircle
                    style={{
                      color: "var(--color-brand-500)",
                      fontSize: "1.5rem",
                      marginTop: "2px",
                    }}
                  />
                  <div>
                    <h5
                      className="fw-bold mb-1"
                      style={{ color: "var(--color-grey-800)" }}
                    >
                      Keep 100% of Revenue
                    </h5>
                    <p
                      className="mb-0"
                      style={{ color: "var(--color-grey-500)" }}
                    >
                      Stop giving away up to 50% of your earnings to other
                      platforms.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <FaCheckCircle
                    style={{
                      color: "var(--color-brand-500)",
                      fontSize: "1.5rem",
                      marginTop: "2px",
                    }}
                  />
                  <div>
                    <h5
                      className="fw-bold mb-1"
                      style={{ color: "var(--color-grey-800)" }}
                    >
                      Seamless Experience
                    </h5>
                    <p
                      className="mb-0"
                      style={{ color: "var(--color-grey-500)" }}
                    >
                      Intuitive course player and dashboard designed for
                      engagement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
