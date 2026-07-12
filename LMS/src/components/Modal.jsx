import { FaTimes } from "react-icons/fa";

/**
 * Small, dependency-free modal. We render it manually (instead of using
 * Bootstrap's data-bs-toggle) so its open/close state stays in React,
 * which plays nicer with react-hook-form + mutations.
 */
const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <div
        className="p-4 rounded-3 shadow-lg"
        style={{
          backgroundColor: "var(--color-grey-0)",
          border: "1px solid var(--color-grey-200)",
          width: "100%",
          maxWidth: "480px",
          margin: "16px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold m-0" style={{ color: "var(--color-grey-900)" }}>
            {title}
          </h4>
          <button
            onClick={onClose}
            className="btn btn-link p-0"
            style={{ color: "var(--color-grey-500)", fontSize: "1.1rem" }}
          >
            <FaTimes />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;