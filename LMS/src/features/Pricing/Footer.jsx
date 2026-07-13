// src/components/pricing/Footer.jsx
// src/components/pricing/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-top tb-border mt-5">
      <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 py-4 small tb-text-muted">
        <p className="mb-0">&copy; {new Date().getFullYear()} Lumina LMS. All rights reserved.</p>
        <div className="d-flex gap-4">
          <a href="#privacy" className="link-secondary link-underline-opacity-0">Privacy Policy</a>
          <a href="#terms" className="link-secondary link-underline-opacity-0">Terms of Service</a>
          <a href="#security" className="link-secondary link-underline-opacity-0">Security</a>
          <a href="#support" className="link-secondary link-underline-opacity-0">Support</a>
        </div>
      </div>
    </footer>
  );
}