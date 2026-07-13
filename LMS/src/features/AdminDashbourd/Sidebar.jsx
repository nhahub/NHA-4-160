// src/components/dashboard/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../data/sidebarData";
import ProfileCard from "./ProfileCard";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="tb-sidebar-backdrop d-lg-none" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`tb-sidebar ${isOpen ? "show" : ""}`}>
        <div className="d-flex align-items-center justify-content-between px-4 py-4">
          <span className="fw-semibold fs-5">EduFlow</span>
          <button
            className="btn btn-sm btn-light border-0 d-lg-none"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="tb-sidebar-nav flex-grow-1 px-3 d-flex flex-column gap-1">
          {SIDEBAR_LINKS.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              end={link.id === "dashboard"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <i className={`bi bi-${link.icon}`} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-top tb-border p-3">
          <ProfileCard compact />
        </div>
      </aside>
    </>
  );
}