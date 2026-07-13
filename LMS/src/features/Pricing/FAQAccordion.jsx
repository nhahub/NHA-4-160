// src/components/pricing/FAQAccordion.jsx
// src/components/pricing/FAQAccordion.jsx
import { useState } from "react";
import { FAQ_ITEMS } from "../../data/pricingData";

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="tb-faq-item">
      <button
        type="button"
        onClick={onToggle}
        className="tb-faq-trigger"
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
      >
        <span className="small fs-6">{item.question}</span>
        <i className="bi bi-chevron-down" />
      </button>

      <div id={`${item.id}-panel`} className={`tb-faq-answer ${isOpen ? "show" : ""}`}>
        <div>
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id ?? null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="container mt-5" style={{ maxWidth: "60rem" }}>
      <div className="row g-4 g-lg-5">
        <div className="col-lg-6">
          <div className="tb-faq-media h-100">
            <span className="small">Team collaboration preview</span>
          </div>
        </div>

        <div className="col-lg-6">
          <h2 className="fw-bold fs-3">Frequently Asked Questions</h2>
          <div className="mt-3">
            {FAQ_ITEMS.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}