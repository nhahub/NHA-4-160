// src/components/dashboard/DashboardNavbar.jsx
export default function DashboardNavbar({ onMenuClick }) {
  return (
    <header className="tb-dashboard-navbar d-flex align-items-center justify-content-between gap-3 px-3 px-sm-4 py-3">
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <button
          className="btn btn-light border-0 d-lg-none"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <i className="bi bi-list fs-4" />
        </button>

        <div className="position-relative d-none d-sm-block" style={{ maxWidth: "18rem", flex: 1 }}>
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 tb-text-muted" />
          <input
            type="search"
            placeholder="Search"
            className="form-control tb-search-input ps-5"
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-outline-secondary d-none d-sm-flex align-items-center gap-2">
          <i className="bi bi-calendar3" />
          Oct 1 - Oct 31, 2023
        </button>

        <button className="btn btn-primary d-none d-sm-flex align-items-center gap-2" type="button">
          <i className="bi bi-download" />
          Export Report
        </button>

        <button className="btn btn-light border-0 position-relative" aria-label="Notifications">
          <i className="bi bi-bell fs-5" />
          <span className="tb-notif-dot" />
        </button>
      </div>
    </header>
  );
}