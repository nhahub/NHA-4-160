import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import {
  FaSun,
  FaMoon,
  FaRocket,
  FaChalkboardTeacher,
  FaPaintBrush,
  FaChartLine,
  FaQuoteLeft,
  FaCheckCircle,
} from "react-icons/fa";

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();

  const brandButtonStyle = {
    backgroundColor: "var(--color-brand-600)",
    color: "var(--color-blue-text)",
    border: "none",
    padding: "12px 24px",
    fontWeight: "600",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
  };

  const cardStyle = {
    backgroundColor: "var(--color-grey-0)",
    borderColor: "var(--color-grey-200)",
    borderRadius: "12px",
    boxShadow: "var(--shadow-sm)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-grey-50)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav
        className="navbar sticky-top"
        style={{
          backgroundColor: "var(--color-grey-0)",
          borderBottom: "1px solid var(--color-grey-200)",
          padding: "12px 0",
        }}
      >
        <div className="container d-flex flex-nowrap align-items-center justify-content-between">
          <Link
            to="/"
            className="navbar-brand m-0 d-flex align-items-center fw-bold fs-5 fs-md-3"
            style={{ color: "var(--color-brand-600)" }}
          >
            <FaChalkboardTeacher className="me-1 me-md-2" />
            TeachBase
          </Link>

          <div className="d-flex align-items-center gap-2 gap-sm-3">
            <button
              onClick={toggleTheme}
              className="btn border-0 p-1 d-flex align-items-center justify-content-center shadow-none"
              style={{
                color: "var(--color-grey-700)",
                fontSize: "1.2rem",
                backgroundColor: "transparent",
              }}
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <Link
              to="/login"
              className="text-decoration-none fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn shadow-sm px-2 px-sm-3"
              style={brandButtonStyle}
            >
              <span className="d-none d-sm-inline">Start for Free</span>
              <span className="d-inline d-sm-none">Start</span>
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow-1">
        <section className="container text-center py-5 mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span
                className="badge px-3 py-2 mb-3 rounded-pill"
                style={{
                  backgroundColor: "var(--color-grey-200)",
                  color: "var(--color-grey-800)",
                }}
              >
                The #1 Multi-Tenant LMS Platform
              </span>
              <h1
                className="display-4 fw-bold mb-4"
                style={{ color: "var(--color-grey-900)" }}
              >
                Launch Your Custom E-Learning Academy in Minutes
              </h1>
              <p
                className="lead mb-5"
                style={{ color: "var(--color-grey-500)" }}
              >
                Stop sharing your revenue with marketplaces. Get your own
                branded platform, manage your students, and scale your teaching
                business independently.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Link
                  to="/register"
                  className="btn btn-lg shadow-md d-flex align-items-center justify-content-center gap-2 px-4"
                  style={brandButtonStyle}
                >
                  <FaRocket /> Create Your Academy Now
                </Link>
                <a
                  href="#features"
                  className="btn btn-lg px-4"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-grey-700)",
                    border: "1px solid var(--color-grey-300)",
                  }}
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container py-5 mt-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: "var(--color-grey-900)" }}>
              Everything You Need to Succeed
            </h2>
            <p style={{ color: "var(--color-grey-500)" }}>
              Powerful features designed specifically for independent educators.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 p-4 " style={cardStyle}>
                <div
                  className="mb-3 d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "var(--color-grey-100)",
                    color: "var(--color-brand-500)",
                    fontSize: "1.5rem",
                  }}
                >
                  <FaPaintBrush />
                </div>
                <h3
                  className="h4 fw-bold"
                  style={{ color: "var(--color-grey-900)" }}
                >
                  Custom Branding
                </h3>
                <p style={{ color: "var(--color-grey-500)" }}>
                  Your logo, your colors. Give your students a professional,
                  white-labeled experience that screams your brand.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 " style={cardStyle}>
                <div
                  className="mb-3 d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "var(--color-grey-100)",
                    color: "var(--color-brand-500)",
                    fontSize: "1.5rem",
                  }}
                >
                  <FaChalkboardTeacher />
                </div>
                <h3
                  className="h4 fw-bold"
                  style={{ color: "var(--color-grey-900)" }}
                >
                  Easy Course Builder
                </h3>
                <p style={{ color: "var(--color-grey-500)" }}>
                  Upload videos, organize lessons, and set pricing with an
                  intuitive drag-and-drop course management system.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 " style={cardStyle}>
                <div
                  className="mb-3 d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "var(--color-grey-100)",
                    color: "var(--color-brand-500)",
                    fontSize: "1.5rem",
                  }}
                >
                  <FaChartLine />
                </div>
                <h3
                  className="h4 fw-bold"
                  style={{ color: "var(--color-grey-900)" }}
                >
                  Insightful Analytics
                </h3>
                <p style={{ color: "var(--color-grey-500)" }}>
                  Track your students' progress, monitor your revenue, and scale
                  your academy with powerful built-in dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-5"
          style={{
            backgroundColor: "var(--color-grey-0)",
            borderTop: "1px solid var(--color-grey-200)",
            borderBottom: "1px solid var(--color-grey-200)",
          }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <h2
                className="fw-bold"
                style={{ color: "var(--color-grey-900)" }}
              >
                How TeachBase Works
              </h2>
              <p style={{ color: "var(--color-grey-500)" }}>
                Start teaching online in three simple steps.
              </p>
            </div>

            <div className="row g-4 text-center">
              <div className="col-md-4">
                <div className="p-4">
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "var(--color-brand-600)",
                      color: "var(--color-grey-0)",
                      fontSize: "2rem",
                    }}
                  >
                    1
                  </div>
                  <h4
                    className="fw-bold mb-3"
                    style={{ color: "var(--color-grey-900)" }}
                  >
                    Create Your Academy
                  </h4>
                  <p style={{ color: "var(--color-grey-500)" }}>
                    Sign up, choose your unique URL (e.g.,
                    yourname.teachbase.com), and customize your theme.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4">
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "var(--color-brand-600)",
                      color: "var(--color-grey-0)",
                      fontSize: "2rem",
                    }}
                  >
                    2
                  </div>
                  <h4
                    className="fw-bold mb-3"
                    style={{ color: "var(--color-grey-900)" }}
                  >
                    Upload Content
                  </h4>
                  <p style={{ color: "var(--color-grey-500)" }}>
                    Add your video lessons, create sections, and structure your
                    course exactly how you want it.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4">
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "var(--color-brand-600)",
                      color: "var(--color-grey-0)",
                      fontSize: "2rem",
                    }}
                  >
                    3
                  </div>
                  <h4
                    className="fw-bold mb-3"
                    style={{ color: "var(--color-grey-900)" }}
                  >
                    Enroll Students
                  </h4>
                  <p style={{ color: "var(--color-grey-500)" }}>
                    Share your link, add students from your dashboard, and start
                    generating independent revenue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5 mt-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: "var(--color-grey-900)" }}>
              Trusted by Educators
            </h2>
            <p style={{ color: "var(--color-grey-500)" }}>
              See what other teachers are saying about TeachBase.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 p-4 " style={cardStyle}>
                <FaQuoteLeft
                  className="mb-3"
                  style={{ fontSize: "2rem", color: "var(--color-grey-300)" }}
                />
                <p
                  className="fs-5 mb-4"
                  style={{
                    color: "var(--color-grey-700)",
                    fontStyle: "italic",
                  }}
                >
                  "Moving to TeachBase was the best decision for my business. I
                  finally have full control over my students and my branding
                  without worrying about platform fees."
                </p>
                <div className="d-flex align-items-center mt-auto">
                  <div
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "var(--color-brand-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    AM
                  </div>
                  <div>
                    <h5
                      className="mb-0 fw-bold"
                      style={{ color: "var(--color-grey-900)" }}
                    >
                      Ahmed M.
                    </h5>
                    <small style={{ color: "var(--color-grey-500)" }}>
                      Senior Math Teacher
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 p-4 " style={cardStyle}>
                <FaQuoteLeft
                  className="mb-3"
                  style={{ fontSize: "2rem", color: "var(--color-grey-300)" }}
                />
                <p
                  className="fs-5 mb-4"
                  style={{
                    color: "var(--color-grey-700)",
                    fontStyle: "italic",
                  }}
                >
                  "The setup took literally 5 minutes. My students love the
                  clean interface, and I love how easy it is to manage my
                  courses from the dashboard."
                </p>
                <div className="d-flex align-items-center mt-auto">
                  <div
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "var(--color-brand-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    SK
                  </div>
                  <div>
                    <h5
                      className="mb-0 fw-bold"
                      style={{ color: "var(--color-grey-900)" }}
                    >
                      Sarah K.
                    </h5>
                    <small style={{ color: "var(--color-grey-500)" }}>
                      Language Instructor
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-5 mt-5"
          style={{ backgroundColor: "var(--color-brand-600)" }}
        >
          <div className="container text-center py-4">
            <h2
              className="display-5 fw-bold mb-3"
              style={{ color: "var(--color-blue-text)" }}
            >
              Ready to build your own academy?
            </h2>
            <p
              className="lead mb-4"
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Join hundreds of teachers who are already scaling their business
              with TeachBase. No credit card required to start.
            </p>
            <Link
              to="/register"
              className="btn btn-lg shadow text-dark bg-white fw-bold px-5 py-3"
              style={{ borderRadius: "8px", transition: "transform 0.2s" }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Get Started for Free
            </Link>
            <div
              className="mt-4 d-flex justify-content-center gap-4 flex-wrap"
              style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem" }}
            >
              <span>
                <FaCheckCircle className="me-1" /> No hidden fees
              </span>
              <span>
                <FaCheckCircle className="me-1" /> Instant setup
              </span>
              <span>
                <FaCheckCircle className="me-1" /> Unlimited students
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer
        className="py-4 mt-auto"
        style={{
          backgroundColor: "var(--color-grey-0)",
          borderTop: "1px solid var(--color-grey-200)",
        }}
      >
        <div className="container text-center">
          <p className="mb-0" style={{ color: "var(--color-grey-500)" }}>
            &copy; {new Date().getFullYear()} TeachBase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
