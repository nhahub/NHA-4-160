import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../../services/planService";
import { registerTeacher } from "../../services/authService";
import { useTheme } from "../../hooks/useTheme";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedPlan = watch("planId");

  const { data: plans, isLoading: isPlansLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Submitting form data:", data);
      await registerTeacher(data);
      toast.success("Academy created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("FULL ERROR OBJECT:", err);
      toast.error(err.message || "Registration failed. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

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
        onSubmit={handleSubmit(onSubmit)}
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
            <p>Loading plans...</p>
          ) : (
            plans?.map((plan) => {
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
                      <FaCheckCircle color="var(--color-brand-600)" size={20} />
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
            })
          )}
          {errors.planId && (
            <span className="text-danger small">Please select a plan</span>
          )}
        </div>
        {/* Inputs */}
        <div className="d-flex flex-column gap-3">
          <div>
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              style={inputStyle}
              {...register("name", { required: true })}
              placeholder="Abdullah Sawan"
            />
          </div>
          <div className="row g-2">
            <div className="col-6">
              <label
                className="form-label fw-semibold"
                style={{ color: "var(--color-grey-700)" }}
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                style={inputStyle}
                {...register("email", { required: true })}
                placeholder="mail@example.com"
              />
            </div>
            <div className="col-6">
              <label
                className="form-label fw-semibold"
                style={{ color: "var(--color-grey-700)" }}
              >
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                style={inputStyle}
                {...register("phone", { required: true })}
                placeholder="010xxxxxxx"
              />
            </div>
          </div>
          <div>
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Academy Name
            </label>
            <input
              type="text"
              className="form-control"
              style={inputStyle}
              {...register("academyName", { required: true })}
              placeholder="My Academy"
            />
          </div>
          <div>
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                style={{ ...inputStyle, borderRight: "none" }}
                placeholder="********"
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
        </div>

        <button
          type="submit"
          className="btn w-100 fw-bold mt-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px",
          }}
        >
          {isLoading ? "Creating..." : "Create Academy"}
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
