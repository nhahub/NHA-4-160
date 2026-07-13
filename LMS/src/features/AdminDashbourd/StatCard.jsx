// src/components/dashboard/StatCard.jsx
const ICONS = {
  wallet2: "wallet2",
  "people-fill": "people-fill",
  "journal-bookmark-fill": "journal-bookmark-fill",
  bullseye: "bullseye",
};

export default function StatCard({ stat }) {
  const iconName = ICONS[stat.icon] ?? "wallet2";
  const isUp = stat.trend === "up";
  const isDown = stat.trend === "down";

  return (
    <div className="tb-card d-flex flex-column gap-3 h-100">
      <div className="d-flex align-items-center justify-content-between">
        <span className="tb-stat-icon">
          <i className={`bi bi-${iconName}`} />
        </span>
        {stat.trend !== "flat" && (
          <span className={`d-flex align-items-center gap-1 small fw-semibold ${isUp ? "tb-trend-up" : "tb-trend-down"}`}>
            <i className={`bi ${isUp ? "bi-arrow-up-right" : "bi-arrow-down-right"}`} />
            {stat.delta}
          </span>
        )}
      </div>
      <div>
        <p className="mb-1 small tb-text-muted">{stat.label}</p>
        <p className="mb-0 fs-3 fw-bold">{stat.value}</p>
      </div>
    </div>
  );
}