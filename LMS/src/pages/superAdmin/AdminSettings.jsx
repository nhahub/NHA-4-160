import { FaShieldAlt } from "react-icons/fa";

const AdminSettings = () => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: "var(--color-grey-900)" }}>
          System Settings
        </h2>
        <p style={{ color: "var(--color-grey-500)" }}>
          Super admin global configurations.
        </p>
      </div>

      <div
        className="p-5 text-center rounded-3"
        style={{
          backgroundColor: "var(--color-grey-0)",
          border: "1px solid var(--color-grey-200)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <FaShieldAlt
          size={48}
          className="mb-3"
          style={{ color: "var(--color-brand-600)" }}
        />
        <h4 className="fw-bold" style={{ color: "var(--color-grey-900)" }}>
          Access Control
        </h4>
        <p
          style={{
            color: "var(--color-grey-600)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          System settings are currently managed via direct database access to
          ensure maximum security.
        </p>
      </div>
    </div>
  );
};

export default AdminSettings;
