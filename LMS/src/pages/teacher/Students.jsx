import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Placeholder } from "react-bootstrap";
import { FaPlus, FaUserGraduate, FaBookOpen } from "react-icons/fa";
import { useTeacherProfile } from "../../hooks/useTeacherProfile";
import { useStudents } from "../../hooks/useStudents";
import { useAddStudent } from "../../hooks/useAddStudent";
import { useEnrollments } from "../../hooks/useEnrollments";
import { useEnrollStudent } from "../../hooks/useEnrollStudent";
import { useTenantCourses } from "../../hooks/useTenantCourses";
import Modal from "../../components/Modal";

const inputStyle = {
  backgroundColor: "var(--color-grey-50)",
  color: "var(--color-grey-900)",
  borderColor: "var(--color-grey-300)",
};

const initialsOf = (name = "") =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AddStudentModal = ({ isOpen, onClose, tenantId }) => {
  const { createStudent, isLoading } = useAddStudent(tenantId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createStudent(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal title="Add New Student" isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3"
      >
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
            placeholder="Ahmed Ali"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-danger small">{errors.name.message}</span>
          )}
        </div>

        <div>
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
            placeholder="student@example.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-danger small">{errors.email.message}</span>
          )}
        </div>

        <div>
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
            placeholder="010xxxxxxx"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <span className="text-danger small">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Temporary Password
          </label>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            placeholder="At least 6 characters"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && (
            <span className="text-danger small">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn w-100 fw-bold mt-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px",
          }}
        >
          {isLoading ? "Adding..." : "Add Student"}
        </button>
      </form>
    </Modal>
  );
};

const EnrollStudentModal = ({
  isOpen,
  onClose,
  tenantId,
  student,
  courses,
}) => {
  const { enrollStudent, isLoading } = useEnrollStudent(tenantId);
  const [courseId, setCourseId] = useState("");

  const handleEnroll = () => {
    if (!courseId) {
      toast.error("Please select a course first");
      return;
    }
    enrollStudent(
      { studentId: student.id, courseId },
      {
        onSuccess: () => {
          setCourseId("");
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      title={`Enroll ${student?.name ?? ""}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="d-flex flex-column gap-3">
        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Select Course
          </label>
          <select
            className="form-select"
            style={inputStyle}
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">-- Choose a course --</option>
            {courses?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title} {course.status !== "published" ? "(draft)" : ""}
              </option>
            ))}
          </select>
          {courses?.length === 0 && (
            <p
              className="small mt-2"
              style={{ color: "var(--color-grey-500)" }}
            >
              You haven't created any courses yet.
            </p>
          )}
        </div>

        <button
          onClick={handleEnroll}
          disabled={isLoading}
          className="btn w-100 fw-bold mt-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px",
          }}
        >
          {isLoading ? "Enrolling..." : "Enroll Student"}
        </button>
      </div>
    </Modal>
  );
};

const Students = () => {
  const { data: profile } = useTeacherProfile();
  const tenantId = profile?.tenant_id;

  const {
    data: students,
    isLoading: isStudentsLoading,
    error,
  } = useStudents(tenantId);
  const { data: enrollments } = useEnrollments(tenantId);
  const { data: courses } = useTenantCourses(tenantId);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState(null);

  const enrollmentsByStudent = useMemo(() => {
    const map = {};
    enrollments?.forEach((en) => {
      if (!map[en.student_id]) map[en.student_id] = [];
      map[en.student_id].push(en.courses?.title);
    });
    return map;
  }, [enrollments]);

  if (isStudentsLoading) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Placeholder as="div" animation="glow" className="w-50">
            <Placeholder
              as="h2"
              xs={4}
              md={2}
              className="rounded-3 mb-2 d-block"
              style={{
                backgroundColor: "var(--color-grey-300)",
                height: "32px",
              }}
            />
            <Placeholder
              as="p"
              xs={6}
              md={3}
              className="rounded-2 m-0 d-block"
              style={{
                backgroundColor: "var(--color-grey-200)",
                height: "20px",
              }}
            />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder.Button
              className="border-0"
              style={{
                backgroundColor: "var(--color-grey-200)",
                width: "140px",
                height: "40px",
                borderRadius: "8px",
                cursor: "default",
              }}
            />
          </Placeholder>
        </div>

        <div
          className="rounded-3 overflow-hidden"
          style={{
            backgroundColor: "var(--color-grey-0)",
            border: "1px solid var(--color-grey-200)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <table className="table m-0 align-middle">
            <thead>
              <tr style={{ backgroundColor: "var(--color-grey-50)" }}>
                <th className="p-3 border-0">
                  <Placeholder animation="glow">
                    <Placeholder
                      xs={4}
                      style={{
                        backgroundColor: "var(--color-grey-300)",
                        height: "20px",
                      }}
                    />
                  </Placeholder>
                </th>
                <th className="p-3 border-0">
                  <Placeholder animation="glow">
                    <Placeholder
                      xs={6}
                      style={{
                        backgroundColor: "var(--color-grey-300)",
                        height: "20px",
                      }}
                    />
                  </Placeholder>
                </th>
                <th className="p-3 border-0">
                  <Placeholder animation="glow">
                    <Placeholder
                      xs={5}
                      style={{
                        backgroundColor: "var(--color-grey-300)",
                        height: "20px",
                      }}
                    />
                  </Placeholder>
                </th>
                <th className="p-3 border-0"></th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr
                  key={i}
                  style={{
                    borderTop: "1px solid var(--color-grey-200)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  <td className="p-3 border-0">
                    <Placeholder
                      animation="glow"
                      className="d-flex align-items-center gap-3"
                    >
                      <Placeholder
                        className="rounded-circle flex-shrink-0"
                        style={{
                          width: "38px",
                          height: "38px",
                          backgroundColor: "var(--color-grey-200)",
                        }}
                      />
                      <div className="flex-grow-1">
                        <Placeholder
                          xs={5}
                          className="rounded-2 mb-1 d-block"
                          style={{
                            backgroundColor: "var(--color-grey-300)",
                            height: "20px",
                          }}
                        />
                        <Placeholder
                          xs={4}
                          className="rounded-2 d-block"
                          style={{
                            backgroundColor: "var(--color-grey-200)",
                            height: "16px",
                          }}
                        />
                      </div>
                    </Placeholder>
                  </td>
                  <td className="p-3 border-0">
                    <Placeholder animation="glow">
                      <Placeholder
                        xs={8}
                        className="rounded-2"
                        style={{
                          backgroundColor: "var(--color-grey-200)",
                          height: "20px",
                        }}
                      />
                    </Placeholder>
                  </td>
                  <td className="p-3 border-0">
                    <Placeholder animation="glow" className="d-flex gap-1">
                      <Placeholder
                        xs={3}
                        className="rounded-pill"
                        style={{
                          height: "24px",
                          backgroundColor: "var(--color-grey-200)",
                        }}
                      />
                      <Placeholder
                        xs={4}
                        className="rounded-pill"
                        style={{
                          height: "24px",
                          backgroundColor: "var(--color-grey-200)",
                        }}
                      />
                    </Placeholder>
                  </td>
                  <td className="p-3 text-end border-0">
                    <Placeholder animation="glow">
                      <Placeholder.Button
                        className="border-0 btn-sm ms-auto"
                        style={{
                          width: "130px",
                          height: "32px",
                          backgroundColor: "var(--color-grey-200)",
                          cursor: "default",
                        }}
                      />
                    </Placeholder>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-danger">Error loading students: {error.message}</div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2
            className="fw-bold mb-1"
            style={{ color: "var(--color-grey-900)" }}
          >
            Students
          </h2>
          <p className="m-0" style={{ color: "var(--color-grey-500)" }}>
            {students?.length ?? 0} student{students?.length === 1 ? "" : "s"}{" "}
            in your academy
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="btn fw-bold d-flex align-items-center gap-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px 18px",
          }}
        >
          <FaPlus /> Add Student
        </button>
      </div>

      {students?.length === 0 ? (
        <div
          className="text-center p-5 rounded-3"
          style={{
            backgroundColor: "var(--color-grey-0)",
            border: "1px dashed var(--color-grey-300)",
          }}
        >
          <FaUserGraduate
            size={32}
            style={{ color: "var(--color-grey-400)" }}
          />
          <p className="mt-3 mb-0" style={{ color: "var(--color-grey-500)" }}>
            No students yet. Add your first student to get started.
          </p>
        </div>
      ) : (
        <div
          className="rounded-3 overflow-hidden"
          style={{
            backgroundColor: "var(--color-grey-0)",
            border: "1px solid var(--color-grey-200)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <table className="table m-0 align-middle">
            <thead>
              <tr style={{ backgroundColor: "var(--color-grey-50)" }}>
                <th
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-600)",
                    backgroundColor: "var(--color-grey-50)",
                  }}
                >
                  Student
                </th>
                <th
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-600)",
                    backgroundColor: "var(--color-grey-50)",
                  }}
                >
                  Phone
                </th>
                <th
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-600)",
                    backgroundColor: "var(--color-grey-50)",
                  }}
                >
                  Enrolled Courses
                </th>
                <th
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-600)",
                    backgroundColor: "var(--color-grey-50)",
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student) => (
                <tr
                  key={student.id}
                  style={{
                    borderTop: "1px solid var(--color-grey-200)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  <td
                    className="p-3 border-0"
                    style={{ backgroundColor: "var(--color-grey-0)" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle fw-bold flex-shrink-0"
                        style={{
                          width: "38px",
                          height: "38px",
                          backgroundColor: "var(--color-grey-100)",
                          color: "var(--color-grey-700)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {initialsOf(student.name)}
                      </div>
                      <div>
                        <div
                          className="fw-semibold"
                          style={{ color: "var(--color-grey-900)" }}
                        >
                          {student.name}
                        </div>
                        <div
                          style={{
                            color: "var(--color-grey-500)",
                            fontSize: "0.85rem",
                          }}
                        >
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="p-3 border-0"
                    style={{
                      color: "var(--color-grey-700)",
                      backgroundColor: "var(--color-grey-0)",
                    }}
                  >
                    {student.phone}
                  </td>
                  <td
                    className="p-3 border-0"
                    style={{ backgroundColor: "var(--color-grey-0)" }}
                  >
                    {enrollmentsByStudent[student.id]?.length ? (
                      <div className="d-flex flex-wrap gap-1">
                        {enrollmentsByStudent[student.id].map((title, idx) => (
                          <span
                            key={idx}
                            className="badge rounded-pill"
                            style={{
                              backgroundColor: "var(--color-grey-100)",
                              color: "var(--color-grey-700)",
                              padding: "6px 10px",
                              fontWeight: 500,
                            }}
                          >
                            {title}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: "var(--color-grey-400)" }}>
                        No courses yet
                      </span>
                    )}
                  </td>
                  <td
                    className="p-3 text-end border-0"
                    style={{ backgroundColor: "var(--color-grey-0)" }}
                  >
                    <button
                      onClick={() => setEnrollTarget(student)}
                      className="btn btn-sm d-flex align-items-center gap-2 ms-auto"
                      style={{
                        backgroundColor: "var(--color-grey-100)",
                        color: "var(--color-grey-800)",
                        border: "1px solid var(--color-grey-300)",
                      }}
                    >
                      <FaBookOpen /> Enroll in Course
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddStudentModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        tenantId={tenantId}
      />

      <EnrollStudentModal
        isOpen={!!enrollTarget}
        onClose={() => setEnrollTarget(null)}
        tenantId={tenantId}
        student={enrollTarget}
        courses={courses}
      />
    </div>
  );
};

export default Students;
