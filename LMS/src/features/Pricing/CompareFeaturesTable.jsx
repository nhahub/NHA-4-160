// src/components/pricing/CompareFeaturesTable.jsx
// src/components/pricing/CompareFeaturesTable.jsx
import { Fragment } from "react";
import { PRICING_PLANS, FEATURE_GROUPS } from "../../data/pricingData";

function Cell({ value }) {
  if (typeof value === "boolean") {
    return value ? (
      <i className="bi bi-check-lg text-primary" />
    ) : (
      <i className="bi bi-dash-lg tb-text-muted" />
    );
  }
  return <span className="tb-text-secondary small">{value}</span>;
}

export default function CompareFeaturesTable() {
  return (
    <section className="container mt-5" style={{ maxWidth: "60rem" }}>
      <h2 className="text-center fw-bold fs-3">Compare all features</h2>

      <div className="table-responsive mt-4 border tb-border tb-rounded-2xl tb-shadow-card">
        <table className="table tb-compare-table mb-0 align-middle text-start">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-3">Feature</th>
              {PRICING_PLANS.map((plan) => (
                <th scope="col" className="px-4 py-3 text-center" key={plan.id}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURE_GROUPS.map((group) => (
              <Fragment key={group.group}>
                <tr className="tb-group-row">
                  <td colSpan={PRICING_PLANS.length + 1} className="px-4 py-2">
                    {group.group}
                  </td>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3">{row.label}</td>
                    {row.values.map((value, idx) => (
                      <td key={idx} className="px-4 py-3 text-center">
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}