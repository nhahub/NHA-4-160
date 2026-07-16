import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Placeholder } from "react-bootstrap";
import { supabase } from "../../config/supabase";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";

const StudentProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const { mutate: updateProfile, isLoading: isUpdatingProfile } =
    useUpdateProfile();
  const { mutate: updatePassword, isLoading: isUpdatingPassword } =
    useUpdatePassword();

  const { register, handleSubmit, reset } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        setCurrentUser(data);
        reset({ name: data.name, phone: data.phone, age: data.age });
      }
    };
    fetchUser();
  }, [reset]);

  const onProfileSubmit = (data) => {
    updateProfile(data);
  };

  const onPasswordSubmit = (data) => {
    updatePassword(data.newPassword, {
      onSuccess: () => resetPassword(),
    });
  };

  const inputStyle = {
    backgroundColor: "var(--color-grey-50)",
    color: "var(--color-grey-900)",
    borderColor: "var(--color-grey-300)",
  };

  if (!currentUser) {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <Placeholder as="h3" animation="glow" className="text-center mb-4">
            <Placeholder
              xs={5}
              style={{
                height: "32px",
                backgroundColor: "var(--color-grey-300)",
              }}
            />
          </Placeholder>

          <div
            className="card shadow-sm border-0 mb-4 p-4 p-md-5"
            style={{ backgroundColor: "var(--color-grey-0)" }}
          >
            <Placeholder as="h5" animation="glow" className="mb-4">
              <Placeholder
                xs={4}
                style={{
                  height: "24px",
                  backgroundColor: "var(--color-grey-300)",
                }}
              />
            </Placeholder>
            <div className="d-flex flex-column gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Placeholder
                    as="label"
                    animation="glow"
                    className="w-100 mb-1"
                  >
                    <Placeholder
                      xs={3}
                      style={{ backgroundColor: "var(--color-grey-200)" }}
                    />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder
                      className="w-100 form-control-lg"
                      style={{
                        backgroundColor: "var(--color-grey-100)",
                        border: "none",
                      }}
                    />
                  </Placeholder>
                </div>
              ))}
              <Placeholder.Button
                className="btn-lg mt-3 border-0 w-50"
                style={{
                  backgroundColor: "var(--color-grey-300)",
                  cursor: "default",
                }}
              />
            </div>
          </div>

          <div
            className="card shadow-sm border-0 p-4 p-md-5"
            style={{ backgroundColor: "var(--color-grey-0)" }}
          >
            <Placeholder as="h5" animation="glow" className="mb-4">
              <Placeholder
                xs={4}
                style={{
                  height: "24px",
                  backgroundColor: "var(--color-grey-300)",
                }}
              />
            </Placeholder>
            <div className="d-flex flex-column gap-3">
              <div>
                <Placeholder as="label" animation="glow" className="w-100 mb-1">
                  <Placeholder
                    xs={3}
                    style={{ backgroundColor: "var(--color-grey-200)" }}
                  />
                </Placeholder>
                <Placeholder animation="glow">
                  <Placeholder
                    className="w-100 form-control-lg"
                    style={{
                      backgroundColor: "var(--color-grey-100)",
                      border: "none",
                    }}
                  />
                </Placeholder>
              </div>
              <Placeholder.Button
                className="btn-lg mt-3 border-0 w-50"
                style={{
                  backgroundColor: "var(--color-grey-300)",
                  cursor: "default",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <h3
          className="fw-bold mb-4 text-center"
          style={{ color: "var(--color-grey-900)" }}
        >
          Account Settings
        </h3>

        <div
          className="card shadow-sm border-0 mb-4 p-4 p-md-5"
          style={{ backgroundColor: "var(--color-grey-0)" }}
        >
          <h5
            className="fw-bold mb-4"
            style={{ color: "var(--color-grey-800)" }}
          >
            Personal Info
          </h5>
          <form
            onSubmit={handleSubmit(onProfileSubmit)}
            className="d-flex flex-column gap-3"
          >
            <div>
              <label
                className="form-label small fw-semibold"
                style={{ color: "var(--color-grey-700)" }}
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                style={inputStyle}
                {...register("name")}
              />
            </div>
            <div>
              <label
                className="form-label small fw-semibold"
                style={{ color: "var(--color-grey-700)" }}
              >
                Phone Number
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                style={inputStyle}
                {...register("phone")}
              />
            </div>
            <div>
              <label
                className="form-label small fw-semibold"
                style={{ color: "var(--color-grey-700)" }}
              >
                Age
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                style={inputStyle}
                {...register("age", { valueAsNumber: true })}
              />
            </div>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="btn btn-lg mt-3 fw-bold"
              style={{
                backgroundColor: "var(--color-brand-600)",
                color: "var(--color-blue-text)",
              }}
            >
              {isUpdatingProfile ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <div
          className="card shadow-sm border-0 p-4 p-md-5"
          style={{ backgroundColor: "var(--color-grey-0)" }}
        >
          <h5
            className="fw-bold mb-4"
            style={{ color: "var(--color-grey-800)" }}
          >
            Security
          </h5>
          <form
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
            className="d-flex flex-column gap-3"
          >
            <div>
              <label
                className="form-label small fw-semibold"
                style={{ color: "var(--color-grey-700)" }}
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                className="form-control form-control-lg"
                style={inputStyle}
                {...registerPassword("newPassword", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="btn btn-lg mt-3 fw-bold"
              style={{
                backgroundColor: "var(--color-grey-200)",
                color: "var(--color-grey-800)",
              }}
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
