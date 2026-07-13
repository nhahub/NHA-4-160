// src/data/pricingData.js
// Central source of truth for pricing plans.
// Swap the static arrays for a Supabase query later, e.g.:
// const { data } = await supabase.from('pricing_plans').select('*');

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for independent educators and small courses",
    priceMonthly: 49,
    priceYearly: 39, // billed yearly, shown per month
    featured: false,
    cta: "Get Started",
    features: [
      "Up to 100 students",
      "Unlimited courses",
      "Standard reporting",
      "Community support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Best for growing training organizations and academies",
    priceMonthly: 199,
    priceYearly: 159,
    featured: true,
    badge: "Most Popular",
    cta: "Upgrade Now",
    features: [
      "Everything in Starter, plus",
      "Up to 2,500 students",
      "White-labeled dashboard",
      "API access & Webhooks",
      "Custom certificates",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Custom security, compliance, and global scale",
    priceMonthly: null,
    priceYearly: null,
    priceLabel: "Custom",
    featured: false,
    cta: "Contact Sales",
    features: [
      "Unlimited students",
      "SAML / SSO authentication",
      "Dedicated success manager",
      "99.9% uptime SLA",
    ],
  },
];

// Rows for the "Compare all features" table.
// `values` order must match PRICING_PLANS order: [starter, professional, enterprise]
export const FEATURE_GROUPS = [
  {
    group: "Core Limits",
    rows: [
      { label: "Active Students", values: ["100", "2,500", "Unlimited"] },
      { label: "Courses & Modules", values: ["Unlimited", "Unlimited", "Unlimited"] },
      { label: "Admin Seats", values: ["1", "5", "Unlimited"] },
    ],
  },
  {
    group: "Customization",
    rows: [
      { label: "Custom Domain", values: [false, true, true] },
      { label: "API Access", values: [false, "Basic", "Full"] },
      { label: "SSO Integration", values: [false, false, true] },
      { label: "Advanced Analytics", values: [false, true, true] },
    ],
  },
];

export const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Can I change plans at any time?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time from your billing settings. Changes are prorated automatically.",
  },
  {
    id: "faq-2",
    question: "Is there a free trial?",
    answer:
      "Every plan includes a 14-day free trial with full access to features. No credit card required to start.",
  },
  {
    id: "faq-3",
    question: "What counts as an 'Active Student'?",
    answer:
      "An active student is any learner enrolled in at least one course during the current billing cycle.",
  },
];
