// src/components/dashboard/EnrollmentTable.jsx
import DashboardCard from "./DashboardCard";
import { usePagination } from "../../hooks/usePagination";
import { ENROLLMENTS } from "../../data/enrollmentData";

const STATUS_CLASSES = {
  Confirmed: "tb-badge-confirmed",
  Pending: "tb-badge-pending",
  Cancelled: "tb-badge-cancelled",
};

function StatusBadge({ status }) {
  return (
    <span className={`badge rounded-pill fw-semibold ${STATUS_CLASSES[status] ?? "bg-secondary-subtle text-secondary-emphasis"}`}>
      {status}
    </span>
  );
}

export default function EnrollmentTable() {
  const { paginatedItems, page, totalPages, nextPage, prevPage, goToPage, hasNext, hasPrev } =
    usePagination(ENROLLMENTS, 3);

  return (
    <DashboardCard
      title="Recent Enrollments"
      subtitle="Manage your latest student enrolling activity"
      action={
        <a href="#all-enrollments" className="small fw-semibold text-primary">
          View all activity <i className="bi bi-arrow-right" />
        </a>
      }
    >
      <div className="table-responsive">
        <table className="table tb-table align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Course</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <span className="tb-avatar" style={{ width: "2rem", height: "2rem" }}>
                      {row.student
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="text-truncate">
                      <p className="mb-0 fw-medium text-truncate">{row.student}</p>
                      <p className="mb-0 small tb-text-muted text-truncate">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="tb-text-secondary">{row.course}</td>
                <td className="tb-text-secondary">{row.date}</td>
                <td>
                  <StatusBadge status={row.status} />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-light border-0"
                    aria-label={`More actions for ${row.student}`}
                  >
                    <i className="bi bi-three-dots" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-center gap-1 mt-3">
        <button onClick={prevPage} disabled={!hasPrev} className="tb-page-btn" aria-label="Previous page">
          <i className="bi bi-chevron-left" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={`tb-page-btn ${num === page ? "active" : ""}`}
          >
            {num}
          </button>
        ))}

        <button onClick={nextPage} disabled={!hasNext} className="tb-page-btn" aria-label="Next page">
          <i className="bi bi-chevron-right" />
        </button>
      </div>
    </DashboardCard>
  );
}
