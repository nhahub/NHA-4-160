// src/components/pricing/Navbar.jsx
import { useState } from "react";

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="tb-navbar sticky-top">
      <nav className="navbar navbar-expand-md py-0">
        <div className="container-xl py-3">
          <a href="/" className="navbar-brand d-flex align-items-center gap-2">
            <span className="tb-logo-badge">
              <i className="bi bi-mortarboard-fill" />
            </span>
            <span className="fw-semibold fs-5" style={{ color: "var(--tb-text-primary)" }}>
              Lumina LMS
            </span>
          </a>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-controls="tbNavbarContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} fs-4`} />
          </button>

          <div className={`navbar-collapse ${isOpen ? "d-block" : "d-none"} d-md-flex`} id="tbNavbarContent">
            <ul className="navbar-nav mx-md-auto my-3 my-md-0 gap-md-4">
              {NAV_LINKS.map((link) => (
                <li className="nav-item" key={link.label}>
                  <a href={link.href} className="nav-link" onClick={() => setIsOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="d-flex flex-column flex-md-row gap-2">
              <button className="btn btn-light border-0 fw-medium">Sign in</button>
              <button className="btn btn-primary fw-semibold tb-shadow-card">Get Started</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}