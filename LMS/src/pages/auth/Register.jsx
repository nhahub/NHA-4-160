import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { Placeholder, Spinner } from "react-bootstrap";
import { useRegister } from "../../hooks/useRegister";
import { useTheme } from "../../hooks/useTheme";
import { useGetPlans } from "../../hooks/useGetPlans";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { mutate: registerTeacher, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedPlan = watch("planId");

  const { data: plans, isPending: isPlansLoading } = useGetPlans();

  const inputStyle = {
    backgroundColor: "var(--color-grey-50)",
    color: "var(--color-grey-900)",
    borderColor: "var(--color-grey-300)",
  };

  return (
    <div
      className="w-100 p-4 p-md-5 shadow-sm"
      style={{
        backgroundColor: "var(--color-grey-0)",
        border: "1px solid var(--color-grey-200)",
      }}
    >
      {/* Theme Switcher */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={toggleTheme}
          className="btn btn-link p-0"
          style={{ color: "var(--color-grey-600)", fontSize: "1.2rem" }}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="mb-4 text-center text-lg-start">
        <h2 className="fw-bold mb-2" style={{ color: "var(--color-grey-900)" }}>
          Create your academy
        </h2>
        <p style={{ color: "var(--color-grey-500)" }}>
          Choose a plan to get started.
        </p>
      </div>

      <form
        onSubmit={handleSubmit((data) => registerTeacher(data))}
        className="d-flex flex-column gap-3"
      >
        {/* Plans Section */}
        <div className="mb-4">
          <label
            className="fw-semibold mb-3 d-block"
            style={{ color: "var(--color-grey-700)" }}
          >
            Select Subscription Plan
          </label>

          {isPlansLoading ? (
            <div>
              {[1, 2].map((i) => (
                <Placeholder key={i} as="div" animation="glow" className="mb-3">
                  <Placeholder
                    className="rounded-3 w-100"
                    style={{
                      height: "100px",
                      backgroundColor: "var(--color-grey-200)",
                    }}
                  />
                </Placeholder>
              ))}
            </div>
          ) : (
            <div>
              {plans?.map((plan) => {
                const isSelected = String(selectedPlan) === String(plan.id);

                return (
                  <label
                    key={plan.id}
                    htmlFor={`plan-${plan.id}`}
                    className="position-relative d-block rounded-3 p-3 mb-3 border transition"
                    style={{
                      cursor: "pointer",
                      border: isSelected
                        ? "2px solid var(--color-brand-600) !important"
                        : "1px solid var(--color-grey-300)",
                      backgroundColor: isSelected
                        ? "var(--color-brand-50)"
                        : "var(--color-grey-0)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      id={`plan-${plan.id}`}
                      type="radio"
                      value={plan.id}
                      {...register("planId", { required: true })}
                      className="d-none"
                    />

                    {isSelected && (
                      <div
                        className="position-absolute"
                        style={{
                          top: "50%",
                          right: "15px",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <FaCheckCircle
                          color="var(--color-brand-600)"
                          size={20}
                        />
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className="fw-bold fs-5"
                        style={{ color: "var(--color-grey-900)" }}
                      >
                        {plan.name}
                      </span>
                      <span
                        className="fw-bold fs-5"
                        style={{ color: "var(--color-brand-600)" }}
                      >
                        {plan.price} EGP
                      </span>
                    </div>

                    <div
                      className="mt-2 small"
                      style={{ color: "var(--color-grey-600)" }}
                    >
                      {plan.features?.map((f, i) => (
                        <div
                          key={i}
                          className="d-flex align-items-center gap-2 mb-1"
                        >
                          <FaCheckCircle
                            size={12}
                            style={{ color: "var(--color-brand-500)" }}
                          />
                          {f}
                        </div>
                      ))}
                    </div>
                  </label>
                );
              })}
              {errors.planId && (
                <span className="text-danger small">Please select a plan</span>
              )}
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            placeholder="Full Name"
            {...register("name", { required: true })}
          />
          <div className="row g-2">
            <div className="col-6">
              <input
                type="email"
                className="form-control"
                style={inputStyle}
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                style={inputStyle}
                placeholder="Phone"
                {...register("phone", { required: true })}
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            placeholder="Academy Name"
            {...register("academyName", { required: true })}
          />

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              style={{ ...inputStyle, borderRight: "none" }}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              className="input-group-text"
              style={{ ...inputStyle, borderLeft: "none" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash color="var(--color-grey-500)" />
              ) : (
                <FaEye color="var(--color-grey-500)" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn w-100 fw-bold mt-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        >
          {isPending ? (
            <>
              {" "}
              <Spinner size="sm" className="me-2" /> Creating...{" "}
            </>
          ) : (
            "Create Academy"
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <span style={{ color: "var(--color-grey-500)" }}>
          Already have an account?{" "}
        </span>
        <Link
          to="/login"
          className="text-decoration-none fw-bold"
          style={{ color: "var(--color-brand-600)" }}
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Register;
