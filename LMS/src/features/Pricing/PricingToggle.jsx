// src/components/pricing/PricingToggle.jsx
// src/components/pricing/PricingToggle.jsx
export default function PricingToggle({ billingCycle, onChange }) {
  const isYearly = billingCycle === "yearly";

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="tb-toggle-group">
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={`tb-toggle-btn ${!isYearly ? "active" : ""}`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange("yearly")}
          className={`tb-toggle-btn d-flex align-items-center ${isYearly ? "active" : ""}`}
        >
          Yearly
          <span className="tb-save-badge">Save 20%</span>
        </button>
      </div>
    </div>
  );
}