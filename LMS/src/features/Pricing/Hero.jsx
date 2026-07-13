// src/components/pricing/Hero.jsx
export default function Hero() {
  return (
    <section className="container text-center pt-5 mt-3" style={{ maxWidth: "48rem" }}>
      <h1 className="fw-bold display-6 display-md-5 lh-sm">
        Predictable pricing for{" "}
        <span className="tb-gradient-text">high-impact learning</span>
      </h1>
      <p className="tb-text-secondary fs-6 fs-md-5 mx-auto mt-3" style={{ maxWidth: "36rem" }}>
        Scalable solutions for education-tech organizations. From individual
        instructors to global institutions, find the plan that fits your
        growth.
      </p>
    </section>
  );
}