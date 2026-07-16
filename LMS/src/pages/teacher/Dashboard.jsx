import { Link } from "react-router-dom";
import { Placeholder } from "react-bootstrap";
import {
  FaUserGraduate,
  FaBook,
  FaBuilding,
  FaPlus,
  FaBookOpen,
  FaCog,
  FaArrowRight,
} from "react-icons/fa";
import { useTeacherProfile } from "../../hooks/useTeacherProfile";
import { useTeacherStats } from "../../hooks/useTeacherStats";
import { useStudents } from "../../hooks/useStudents";

const StatCard = ({ icon, label, value, isLoading }) => (
  <div className="col-12 col-md-4">
    <div
      className="p-4 rounded-3 h-100 d-flex align-items-center gap-3"
      style={{
        backgroundColor: "var(--color-grey-0)",
        border: "1px solid var(--color-grey-200)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center rounded-3"
        style={{
          width: "52px",
          height: "52px",
          backgroundColor: "var(--color-brand-600)",
          color: "var(--color-blue-text)",
          fontSize: "1.4rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div className="flex-grow-1">
        <p className="mb-1" style={{ color: "var(--color-grey-500)" }}>
          {label}
        </p>
        {isLoading ? (
          <Placeholder animation="glow" className="m-0">
            <Placeholder
              xs={8}
              className="rounded-2"
              style={{
                height: "28px",
                minWidth: "60px",
                backgroundColor: "var(--color-grey-300)",
              }}
            />
          </Placeholder>
        ) : (
          <h3
            className="fw-bold m-0"
            style={{ color: "var(--color-grey-900)" }}
          >
            {value}
          </h3>
        )}
      </div>
    </div>
  </div>
);

const QuickAction = ({ to, icon, title, subtitle }) => (
  <Link
    to={to}
    className="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
    style={{ border: "1px solid var(--color-grey-200)" }}
  >
    <div
      className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
      style={{
        width: "42px",
        height: "42px",
        backgroundColor: "var(--color-grey-100)",
        color: "var(--color-brand-600)",
        fontSize: "1.1rem",
      }}
    >
      {icon}
    </div>
    <div className="flex-grow-1">
      <div className="fw-semibold" style={{ color: "var(--color-grey-900)" }}>
        {title}
      </div>
      <div style={{ color: "var(--color-grey-500)", fontSize: "0.85rem" }}>
        {subtitle}
      </div>
    </div>
    <FaArrowRight style={{ color: "var(--color-grey-400)" }} />
  </Link>
);

const initialsOf = (name = "") =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Dashboard = () => {
  const { data: profile, isLoading: isProfileLoading } = useTeacherProfile();
  const tenantId = profile?.tenant_id;

  const { data: stats, isLoading: isStatsLoading } = useTeacherStats(tenantId);
  const { data: students, isLoading: isStudentsLoading } =
    useStudents(tenantId);

  const recentStudents = students?.slice(0, 5) ?? [];

  if (isProfileLoading) {
    return (
      <div>
        <div className="mb-4">
          <Placeholder as="h2" animation="glow" className="mb-2">
            <Placeholder
              xs={6}
              md={3}
              className="rounded-3"
              style={{
                height: "32px",
                backgroundColor: "var(--color-grey-300)",
              }}
            />
          </Placeholder>
          <Placeholder as="p" animation="glow">
            <Placeholder
              xs={8}
              md={4}
              className="rounded-2"
              style={{ backgroundColor: "var(--color-grey-200)" }}
            />
          </Placeholder>
        </div>

        <div className="row g-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="col-12 col-md-4">
              <div
                className="p-4 rounded-3 h-100 d-flex align-items-center gap-3"
                style={{
                  backgroundColor: "var(--color-grey-0)",
                  border: "1px solid var(--color-grey-200)",
                }}
              >
                <Placeholder animation="glow" className="flex-shrink-0">
                  <Placeholder
                    className="rounded-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      backgroundColor: "var(--color-grey-200)",
                    }}
                  />
                </Placeholder>
                <div className="w-100">
                  <Placeholder animation="glow" className="mb-1">
                    <Placeholder
                      xs={6}
                      className="rounded-2"
                      style={{ backgroundColor: "var(--color-grey-200)" }}
                    />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder
                      xs={4}
                      className="rounded-2"
                      style={{
                        height: "28px",
                        backgroundColor: "var(--color-grey-300)",
                      }}
                    />
                  </Placeholder>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-4">
            <div
              className="p-4 rounded-3 h-100"
              style={{
                backgroundColor: "var(--color-grey-0)",
                border: "1px solid var(--color-grey-200)",
              }}
            >
              <Placeholder as="h5" animation="glow" className="mb-3">
                <Placeholder
                  xs={5}
                  className="rounded-2"
                  style={{
                    height: "24px",
                    backgroundColor: "var(--color-grey-300)",
                  }}
                />
              </Placeholder>
              <div className="d-flex flex-column gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="d-flex align-items-center gap-3 p-3 rounded-3"
                    style={{ border: "1px solid var(--color-grey-100)" }}
                  >
                    <Placeholder animation="glow" className="flex-shrink-0">
                      <Placeholder
                        className="rounded-3"
                        style={{
                          width: "42px",
                          height: "42px",
                          backgroundColor: "var(--color-grey-200)",
                        }}
                      />
                    </Placeholder>
                    <div className="w-100">
                      <Placeholder animation="glow" className="mb-1">
                        <Placeholder
                          xs={7}
                          className="rounded-2"
                          style={{ backgroundColor: "var(--color-grey-300)" }}
                        />
                      </Placeholder>
                      <Placeholder animation="glow">
                        <Placeholder
                          xs={9}
                          className="rounded-2"
                          style={{ backgroundColor: "var(--color-grey-200)" }}
                        />
                      </Placeholder>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div
              className="p-4 rounded-3 h-100"
              style={{
                backgroundColor: "var(--color-grey-0)",
                border: "1px solid var(--color-grey-200)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Placeholder as="h5" animation="glow" className="m-0 w-25">
                  <Placeholder
                    xs={12}
                    className="rounded-2"
                    style={{
                      height: "24px",
                      backgroundColor: "var(--color-grey-300)",
                    }}
                  />
                </Placeholder>
                <Placeholder animation="glow" className="w-25 text-end">
                  <Placeholder
                    xs={8}
                    className="rounded-2"
                    style={{ backgroundColor: "var(--color-grey-200)" }}
                  />
                </Placeholder>
              </div>
              <div className="d-flex flex-column gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="d-flex align-items-center gap-3 p-2 rounded-3"
                    style={{ borderBottom: "1px solid var(--color-grey-100)" }}
                  >
                    <Placeholder animation="glow" className="flex-shrink-0">
                      <Placeholder
                        className="rounded-circle"
                        style={{
                          width: "38px",
                          height: "38px",
                          backgroundColor: "var(--color-grey-200)",
                        }}
                      />
                    </Placeholder>
                    <div className="w-100">
                      <Placeholder animation="glow" className="mb-1">
                        <Placeholder
                          xs={3}
                          className="rounded-2"
                          style={{ backgroundColor: "var(--color-grey-300)" }}
                        />
                      </Placeholder>
                      <Placeholder animation="glow">
                        <Placeholder
                          xs={5}
                          className="rounded-2"
                          style={{ backgroundColor: "var(--color-grey-200)" }}
                        />
                      </Placeholder>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: "var(--color-grey-900)" }}>
          Welcome back, {profile?.name}
        </h2>
        <p style={{ color: "var(--color-grey-500)" }}>
          Here's what's happening in{" "}
          <span style={{ color: "var(--color-brand-600)", fontWeight: 600 }}>
            {profile?.tenants?.academy_name}
          </span>{" "}
          today.
        </p>
      </div>

      <div className="row g-3 mb-4">
        <StatCard
          icon={<FaUserGraduate />}
          label="Total Students"
          value={stats?.totalStudents ?? 0}
          isLoading={isStatsLoading}
        />
        <StatCard
          icon={<FaBook />}
          label="Total Courses"
          value={stats?.totalCourses ?? 0}
          isLoading={isStatsLoading}
        />
        <StatCard
          icon={<FaBuilding />}
          label="Academy"
          value={profile?.tenants?.academy_name ?? "-"}
          isLoading={isProfileLoading}
        />
      </div>

      <div className="row g-3">
        {/* Quick actions */}
        <div className="col-12 col-lg-4">
          <div
            className="p-4 rounded-3 h-100"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-200)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h5
              className="fw-bold mb-3"
              style={{ color: "var(--color-grey-900)" }}
            >
              Quick Actions
            </h5>
            <div className="d-flex flex-column gap-2">
              <QuickAction
                to="/dashboard/students"
                icon={<FaPlus />}
                title="Add Student"
                subtitle="Create a new student account"
              />
              <QuickAction
                to="/dashboard/courses"
                icon={<FaBookOpen />}
                title="Manage Courses"
                subtitle="Build and edit your curriculum"
              />
              <QuickAction
                to="/dashboard/settings"
                icon={<FaCog />}
                title="Academy Settings"
                subtitle="Update your name & logo"
              />
            </div>
          </div>
        </div>

        {/* Recently added students */}
        <div className="col-12 col-lg-8">
          <div
            className="p-4 rounded-3 h-100"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-200)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5
                className="fw-bold m-0"
                style={{ color: "var(--color-grey-900)" }}
              >
                Recently Added Students
              </h5>
              <Link
                to="/dashboard/students"
                className="fw-semibold text-decoration-none small"
                style={{ color: "var(--color-brand-600)" }}
              >
                View all students
              </Link>
            </div>

            {isStudentsLoading ? (
              <div className="d-flex flex-column gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="d-flex align-items-center gap-3 p-2 rounded-3"
                    style={{ borderBottom: "1px solid var(--color-grey-100)" }}
                  >
                    <Placeholder animation="glow" className="flex-shrink-0">
                      <Placeholder
                        className="rounded-circle"
                        style={{
                          width: "38px",
                          height: "38px",
                          backgroundColor: "var(--color-grey-200)",
                        }}
                      />
                    </Placeholder>
                    <div className="w-100">
                      <Placeholder animation="glow" className="mb-1">
                        <Placeholder
                          xs={4}
                          className="rounded-2"
                          style={{ backgroundColor: "var(--color-grey-300)" }}
                        />
                      </Placeholder>
                      <Placeholder animation="glow">
                        <Placeholder
                          xs={6}
                          className="rounded-2"
                          style={{ backgroundColor: "var(--color-grey-200)" }}
                        />
                      </Placeholder>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentStudents.length === 0 ? (
              <div className="text-center py-4">
                <FaUserGraduate
                  size={28}
                  style={{ color: "var(--color-grey-400)" }}
                />
                <p
                  className="mt-3 mb-0"
                  style={{ color: "var(--color-grey-500)" }}
                >
                  No students yet. Add your first student to get started.
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {recentStudents.map((student) => (
                  <div
                    key={student.id}
                    className="d-flex align-items-center gap-3 p-2 rounded-3"
                    style={{ borderBottom: "1px solid var(--color-grey-100)" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle fw-bold flex-shrink-0"
                      style={{
                        width: "38px",
                        height: "38px",
                        backgroundColor: "var(--color-grey-100)",
                        color: "var(--color-grey-700)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {initialsOf(student.name)}
                    </div>
                    <div className="flex-grow-1">
                      <div
                        className="fw-semibold"
                        style={{ color: "var(--color-grey-900)" }}
                      >
                        {student.name}
                      </div>
                      <div
                        style={{
                          color: "var(--color-grey-500)",
                          fontSize: "0.85rem",
                        }}
                      >
                        {student.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
