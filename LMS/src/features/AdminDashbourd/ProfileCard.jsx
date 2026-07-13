// src/components/dashboard/ProfileCard.jsx
import { TEACHER_PROFILE } from "../../data/enrollmentData";

export default function ProfileCard({ compact = false }) {
  const { name, role, avatarInitials } = TEACHER_PROFILE;

  return (
    <div className={`d-flex align-items-center gap-3 ${compact ? "" : "border tb-border tb-rounded-xl p-3"}`}>
      <div className="tb-avatar" style={{ width: "2.5rem", height: "2.5rem" }}>
        {avatarInitials}
      </div>
      <div className="text-truncate">
        <p className="mb-0 small fw-semibold text-truncate">{name}</p>
        <p className="mb-0 small tb-text-muted text-truncate">{role}</p>
      </div>
    </div>
  );
}