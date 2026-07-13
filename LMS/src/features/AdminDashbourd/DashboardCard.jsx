// src/components/dashboard/DashboardCard.jsx
export default function DashboardCard({ title, subtitle, action, children, className = "" }) {
  return (
    <div className={`tb-card ${className}`}>
      {(title || action) && (
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            {title && <h3 className="fs-6 fw-semibold mb-0">{title}</h3>}
            {subtitle && <p className="small tb-text-muted mb-0 mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
