// src/components/pricing/PricingCard.jsx
// src/components/pricing/PricingCard.jsx
export default function PricingCard({ plan, billingCycle, onSelectPlan }) {
  const { name, tagline, features, featured, badge, cta, priceLabel } = plan;

  const price =
    priceLabel ?? (billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly);

  const buttonClass = featured
    ? "btn btn-primary fw-semibold"
    : plan.id === "enterprise"
    ? "btn btn-dark fw-semibold"
    : "btn btn-outline-secondary fw-semibold";

  return (
    <div className={`tb-pricing-card ${featured ? "tb-pricing-card--featured" : ""}`}>
      {featured && badge && <span className="tb-pricing-badge">{badge}</span>}

      <h3 className="fs-6 fw-semibold mb-2">{name}</h3>
      <p className="tb-text-secondary small tb-price-tagline">{tagline}</p>

      <div className="d-flex align-items-end gap-1 mt-3">
        {typeof price === "number" ? (
          <>
            <span className="fs-2 fw-bold">${price}</span>
            <span className="tb-text-muted small pb-1">/mo</span>
          </>
        ) : (
          <span className="fs-2 fw-bold">{price}</span>
        )}
      </div>

      <button type="button" onClick={() => onSelectPlan?.(plan)} className={`${buttonClass} w-100 mt-4`}>
        {cta}
      </button>

      <ul className="list-unstyled mt-4 d-flex flex-column gap-3 mb-0">
        {features.map((feature) => (
          <li key={feature} className="d-flex align-items-start gap-2 small tb-text-secondary">
            <i className="bi bi-check-lg tb-feature-check" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}