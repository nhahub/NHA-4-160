// src/components/dashboard/QuickActions.jsx
import DashboardCard from "./DashboardCard";
import { QUICK_ACTIONS } from "../../data/enrollmentData";

export default function QuickActions({ onAction }) {
  return (
    <DashboardCard title="Quick Actions" className="h-100">
      <div className="d-flex flex-column gap-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction?.(action.id)}
            className="tb-quick-action-btn"
          >
            <span className="tb-icon-tile" style={{ width: "2rem", height: "2rem" }}>
              <i className={`bi bi-${action.icon}`} />
            </span>
            {action.label}
          </button>
        ))}
      </div>
    </DashboardCard>
  );
}