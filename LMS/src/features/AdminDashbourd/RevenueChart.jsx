// src/components/dashboard/RevenueChart.jsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardCard from "./DashboardCard";
import { REVENUE_SERIES } from "../../data/enrollmentData";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border tb-border tb-rounded-lg px-3 py-2 small tb-shadow-popover">
      <p className="fw-semibold mb-1">{label}</p>
      <p className="mb-0 text-primary">Revenue: ${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function RevenueChart() {
  return (
    <DashboardCard
      title="Revenue & Growth"
      subtitle="Comprehensive performance analysis for the current quarter"
      className="h-100"
    >
      <div style={{ height: "16rem", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_SERIES} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ecebf5" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#9997ab" }}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#9997ab" }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}