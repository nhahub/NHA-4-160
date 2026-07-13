import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTeacherProfile } from "../../hooks/useTeacherProfile";
import { useAcademy } from "../../hooks/useAcademy";
import { getAcademyStudents } from "../../services/studentService";
import {
  FiBookOpen,
  FiUsers,
  FiCheckCircle,
  FiPlusCircle,
  FiUserPlus,
} from "react-icons/fi";

const Dashboard = () => {
  const { data: teacher, isLoading: teacherLoading } = useTeacherProfile();
  const tenantId = teacher?.tenant_id;

  const { data: academy, isLoading: academyLoading } = useAcademy(tenantId);

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ["students", tenantId],
    queryFn: () => getAcademyStudents(tenantId),
    enabled: !!tenantId,
  });

  const isLoading = teacherLoading || academyLoading || studentsLoading;

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="spinner-border"
          style={{ color: "var(--color-brand-600)" }}
          role="status"
        >
          <span className="visually-hidden">جارٍ التحميل...</span>
        </div>
      </div>
    );
  }

  const courses = academy?.courses || [];
  const publishedCount = courses.filter((c) => c.status === "published").length;
  const totalStudents = students?.length || 0;
  const recentStudents = [...(students || [])]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "var(--color-grey-900)" }}>
            لوحة تحكم المدرس
          </h2>
          <p className="mb-0" style={{ color: "var(--color-grey-500)" }}>
            أهلاً بيك، {teacher?.name || "أستاذ"} 👋 — {academy?.academy_name}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <StatCard
          icon={<FiBookOpen size={22} />}
          label="إجمالي الكورسات"
          value={courses.length}
          color="var(--color-brand-600)"
        />
        <StatCard
          icon={<FiCheckCircle size={22} />}
          label="كورسات منشورة"
          value={publishedCount}
          color="#16a34a"
        />
        <StatCard
          icon={<FiUsers size={22} />}
          label="إجمالي الطلاب"
          value={totalStudents}
          color="var(--color-blue-solid)"
        />
        <StatCard
          icon={<FiCheckCircle size={22} />}
          label="حالة الأكاديمية"
          value={academy?.status === "active" ? "نشطة" : "غير نشطة"}
          color={academy?.status === "active" ? "#16a34a" : "#dc2626"}
        />
      </div>

      <div className="row g-3">
        {/* Recent Students */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold">آخر الطلاب المسجلين</h5>
              <Link to="/dashboard/students" className="small text-decoration-none">
                عرض الكل
              </Link>
            </div>
            <div className="card-body p-0">
              {recentStudents.length === 0 ? (
                <p className="text-center text-muted py-5 mb-0">
                  لسه مفيش طلاب متسجلين في الأكاديمية
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th className="ps-4">الاسم</th>
                        <th>البريد الإلكتروني</th>
                        <th className="pe-4">تاريخ التسجيل</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentStudents.map((s) => (
                        <tr key={s.id}>
                          <td className="ps-4 fw-semibold">{s.name}</td>
                          <td>{s.email}</td>
                          <td className="pe-4">
                            {s.created_at
                              ? new Date(s.created_at).toLocaleDateString("ar-EG")
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-3">إجراءات سريعة</h5>
              <div className="d-grid gap-2">
                <Link
                  to="/dashboard/courses"
                  className="btn btn-outline-primary d-flex align-items-center gap-2 text-start"
                >
                  <FiPlusCircle /> إضافة كورس جديد
                </Link>
                <Link
                  to="/dashboard/students"
                  className="btn btn-outline-secondary d-flex align-items-center gap-2 text-start"
                >
                  <FiUserPlus /> دعوة طلاب جدد
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="col-6 col-md-3">
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
          style={{ width: 44, height: 44, background: `${color}1a`, color }}
        >
          {icon}
        </div>
        <p className="small mb-1" style={{ color: "var(--color-grey-500)" }}>
          {label}
        </p>
        <h4 className="fw-bold mb-0">{value}</h4>
      </div>
    </div>
  </div>
);

export default Dashboard;