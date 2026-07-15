import { FaBuilding, FaUsers, FaBookOpen } from "react-icons/fa";
import { useSystemStats } from "../../hooks/useSuperAdmin";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["var(--color-brand-600)", "var(--color-brand-300)"];

const StatCard = ({ icon, label, value }) => (
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
      <div>
        <p className="mb-1" style={{ color: "var(--color-grey-500)" }}>
          {label}
        </p>
        <h3 className="fw-bold m-0" style={{ color: "var(--color-grey-900)" }}>
          {value}
        </h3>
      </div>
    </div>
  </div>
);

const AdminStats = () => {
  const { data, isLoading } = useSystemStats();

  if (isLoading)
    return (
      <div style={{ color: "var(--color-grey-700)" }}>Loading stats...</div>
    );

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: "var(--color-grey-900)" }}>
          System Overview
        </h2>
        <p style={{ color: "var(--color-grey-500)" }}>
          Global statistics across all academies and users.
        </p>
      </div>

      <div className="row g-3 mb-4">
        <StatCard
          icon={<FaBuilding />}
          label="Total Academies"
          value={data?.totalTenants || 0}
        />
        <StatCard
          icon={<FaUsers />}
          label="Total Users"
          value={data?.totalUsers || 0}
        />
        <StatCard
          icon={<FaBookOpen />}
          label="Total Courses"
          value={data?.totalCourses || 0}
        />
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-8">
          <div
            className="p-4 rounded-3 h-100"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-200)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h5
              className="fw-bold mb-4"
              style={{ color: "var(--color-grey-900)" }}
            >
              Platform Growth
            </h5>
            <div style={{ width: "100%", height: "300px" }}>
              <ResponsiveContainer>
                <AreaChart
                  data={data?.chartData || []}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-brand-600)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-brand-600)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-grey-200)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-grey-400)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--color-grey-400)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-grey-0)",
                      borderColor: "var(--color-grey-200)",
                      borderRadius: "8px",
                      color: "var(--color-grey-900)",
                    }}
                    itemStyle={{ color: "var(--color-grey-900)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    name="New Users"
                    stroke="var(--color-brand-600)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                  <Area
                    type="monotone"
                    dataKey="academies"
                    name="New Academies"
                    stroke="var(--color-brand-300)"
                    strokeWidth={3}
                    fillOpacity={0.5}
                    fill="var(--color-brand-300)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

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
              className="fw-bold mb-4"
              style={{ color: "var(--color-grey-900)" }}
            >
              System Course Status
            </h5>
            <div style={{ width: "100%", height: "300px" }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data?.courseStatusData || []}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {(data?.courseStatusData || []).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-grey-0)",
                      borderColor: "var(--color-grey-200)",
                      borderRadius: "8px",
                      color: "var(--color-grey-900)",
                    }}
                    itemStyle={{ color: "var(--color-grey-900)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="d-flex justify-content-center gap-4 mt-2">
              <div className="d-flex align-items-center gap-2">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: COLORS[0],
                    borderRadius: "50%",
                  }}
                ></div>
                <span
                  className="small fw-semibold"
                  style={{ color: "var(--color-grey-700)" }}
                >
                  Published
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: COLORS[1],
                    borderRadius: "50%",
                  }}
                ></div>
                <span
                  className="small fw-semibold"
                  style={{ color: "var(--color-grey-700)" }}
                >
                  Draft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <div
            className="p-4 rounded-3"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-200)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h5
              className="fw-bold mb-4"
              style={{ color: "var(--color-grey-900)" }}
            >
              Enrollments Activity
            </h5>
            <div style={{ width: "100%", height: "300px" }}>
              <ResponsiveContainer>
                <BarChart
                  data={data?.chartData || []}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barSize={32}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-grey-200)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-grey-400)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--color-grey-400)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-grey-100)" }}
                    contentStyle={{
                      backgroundColor: "var(--color-grey-0)",
                      borderColor: "var(--color-grey-200)",
                      borderRadius: "8px",
                      color: "var(--color-grey-900)",
                    }}
                    itemStyle={{ color: "var(--color-grey-900)" }}
                  />
                  <Bar
                    dataKey="enrollments"
                    name="Student Enrollments"
                    fill="var(--color-brand-600)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
