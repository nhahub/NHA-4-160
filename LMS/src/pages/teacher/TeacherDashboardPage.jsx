import { useTeacherProfile } from "../../hooks/useTeacherProfile";
import StatCard from "../../features/AdminDashbourd/StatCard";
import RevenueChart from "../../features/AdminDashbourd/RevenueChart";
import QuickActions from "../../features/AdminDashbourd/QuickActions";
import EnrollmentTable from "../../features/AdminDashbourd/EnrollmentTable";
import { STAT_CARDS } from "../../data/enrollmentData";

export default function TeacherDashboardPage() {
  const { data: profile, isLoading, error } = useTeacherProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;

  return (
    <div>
      <div className="mb-4">
        <h1 className="fs-3 fw-bold mb-1">Welcome, {profile.name}!</h1>
        <p className="small tb-text-secondary mb-0">
          Academy: {profile.tenants?.academy_name}
        </p>
      </div>

      <div className="row row-cols-2 row-cols-lg-4 g-3 mb-4">
        {STAT_CARDS.map((stat) => (
          <div className="col" key={stat.id}>
            <StatCard stat={stat} />
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <RevenueChart />
        </div>
        <div className="col-12 col-lg-4">
          <QuickActions onAction={(id) => console.log("Quick action:", id)} />
        </div>
      </div>

      <EnrollmentTable />
    </div>
  );
}