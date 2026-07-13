// src/pages/PricingPage.jsx
import { useState } from "react";
import Navbar from "../../features/Pricing/Navbar";
import Hero from "../../features/Pricing/Hero";
import PricingToggle from "../../features/Pricing/PricingToggle";
import PricingCard from "../../features/Pricing/PricingCard";
import CompareFeaturesTable from "../../features/Pricing/CompareFeaturesTable";
import FAQAccordion from "../../features/Pricing/FAQAccordion";
import Footer from "../../features/Pricing/Footer";
import { PRICING_PLANS } from "../../data/pricingData";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  // TODO: wire this up to Supabase, e.g. create a checkout session
  // or redirect to a Stripe portal keyed on plan.id.
  const handleSelectPlan = (plan) => {
    console.log("Selected plan:", plan.id, billingCycle);
  };

  return (
    <div className="bg-white min-vh-100">
      <Navbar />

      <main>
        <Hero />

        <div id="pricing">
          <PricingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
        </div>

        <section className="container mt-5" style={{ maxWidth: "60rem" }}>
          <div className="row g-4">
            {PRICING_PLANS.map((plan) => (
              <div className="col-12 col-md-4" key={plan.id}>
                <PricingCard plan={plan} billingCycle={billingCycle} onSelectPlan={handleSelectPlan} />
              </div>
            ))}
          </div>
        </section>

        <CompareFeaturesTable />
        <FAQAccordion />
      </main>

      <Footer />
    </div>
  );
}