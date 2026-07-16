import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending } = useLogin();

  const [searchParams] = useSearchParams();
  const academy = searchParams.get("academy");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login({ email: data.email, password: data.password });
  };

  const inputStyle = {
    backgroundColor: "var(--color-grey-50)",
    color: "var(--color-grey-900)",
    borderColor: "var(--color-grey-300)",
  };

  return (
    <div
      className="w-100 p-4 p-md-5 rounded-4 shadow-sm"
      style={{
        backgroundColor: "var(--color-grey-0)",
        border: "1px solid var(--color-grey-200)",
      }}
    >
      <div className="mb-4 text-center text-lg-start">
        <h2
          className="fw-bold mb-2 text-capitalize"
          style={{ color: "var(--color-grey-900)" }}
        >
          {academy
            ? `Welcome to ${academy.replace(/-/g, " ")}`
            : "Welcome back"}
        </h2>

        <p style={{ color: "var(--color-grey-500)" }}>
          {academy
            ? "Please enter your student details to sign in."
            : "Please enter your details to sign in."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-4"
      >
        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Email address
          </label>
          <input
            type="email"
            className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
            style={inputStyle}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback d-block fw-medium">
              {errors.email.message}
            </div>
          )}
        </div>

        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Password
          </label>
          <div className="input-group input-group-lg">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              style={{ ...inputStyle, borderRight: "none" }}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              className="input-group-text"
              style={{
                ...inputStyle,
                borderLeft: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash style={{ color: "var(--color-grey-500)" }} />
              ) : (
                <FaEye style={{ color: "var(--color-grey-500)" }} />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block fw-medium">
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-lg w-100 fw-bold shadow-sm mt-2 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "12px",
            border: "none",
            transition: "opacity 0.3s ease",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Logging in...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      {!academy && (
        <div className="mt-4 text-center">
          <span style={{ color: "var(--color-grey-500)", fontSize: "0.95rem" }}>
            Don't have an academy?{" "}
          </span>
          <Link
            to="/register"
            className="text-decoration-none fw-bold ms-1"
            style={{ color: "var(--color-brand-600)", fontSize: "0.95rem" }}
          >
            Start Your academy
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
