import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center text-center p-3"
      style={{ backgroundColor: "var(--color-grey-50)" }}
    >
      <FaExclamationTriangle
        size={64}
        className="mb-4"
        style={{ color: "var(--color-brand-600)" }}
      />
      <h1
        className="fw-bold display-1 mb-2"
        style={{ color: "var(--color-grey-900)" }}
      >
        404
      </h1>
      <h3 className="fw-bold mb-3" style={{ color: "var(--color-grey-800)" }}>
        Page Not Found
      </h3>
      <p
        className="fs-5 mb-4"
        style={{ color: "var(--color-grey-500)", maxWidth: "500px" }}
      >
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn fw-bold px-4 py-2"
        style={{
          backgroundColor: "var(--color-brand-600)",
          color: "var(--color-blue-text)",
          borderRadius: "8px",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
