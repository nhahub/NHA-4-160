import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaPlus, FaBook, FaPen, FaTrash, FaLayerGroup } from "react-icons/fa";
import { useTeacherProfile } from "../../hooks/useTeacherProfile";
import { useTenantCourses } from "../../hooks/useTenantCourses";
import { useCreateCourse } from "../../hooks/useCreateCourse";
import { useUpdateCourse } from "../../hooks/useUpdateCourse";
import { useDeleteCourse } from "../../hooks/useDeleteCourse";
import { uploadCourseImage } from "../../services/storageApi";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";

const inputStyle = {
  backgroundColor: "var(--color-grey-50)",
  color: "var(--color-grey-900)",
  borderColor: "var(--color-grey-300)",
};

const statusBadge = (status) => ({
  backgroundColor: status === "published" ? "#dcfce7" : "var(--color-grey-100)",
  color: status === "published" ? "#166534" : "var(--color-grey-600)",
  padding: "4px 10px",
  fontWeight: 600,
  textTransform: "capitalize",
});

const CourseFormModal = ({ isOpen, onClose, tenantId, course }) => {
  const isEditing = !!course;
  const { createNewCourse, isLoading: isCreating } = useCreateCourse(tenantId);
  const { editCourse, isLoading: isEditingLoading } = useUpdateCourse(tenantId);
  const isLoading = isCreating || isEditingLoading;

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    values: {
      title: course?.title ?? "",
      description: course?.description ?? "",
      price: course?.price ?? "",
      status: course?.status ?? "draft",
      thumbnail_url: course?.thumbnail_url ?? "",
    },
  });

  const thumbnailUrl = watch("thumbnail_url");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploadingImage(true);
      const url = await uploadCourseImage(file);
      setValue("thumbnail_url", url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      status: data.status,
      thumbnail_url: data.thumbnail_url,
    };

    if (isEditing) {
      editCourse(
        {
          courseId: course.id,
          updates: payload,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    } else {
      createNewCourse(payload, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Course" : "Create New Course"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3"
      >
        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            placeholder="Advanced UI Design"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-danger small">{errors.title.message}</span>
          )}
        </div>

        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Description
          </label>
          <textarea
            className="form-control"
            style={inputStyle}
            rows={3}
            placeholder="What will students learn?"
            {...register("description")}
          />
        </div>

        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Course Image (Thumbnail)
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control mb-2"
            style={inputStyle}
            onChange={handleImageUpload}
            disabled={isUploadingImage}
          />
          {isUploadingImage && (
            <span
              className="small fw-bold"
              style={{ color: "var(--color-brand-600)" }}
            >
              Uploading image...
            </span>
          )}
          {thumbnailUrl && !isUploadingImage && (
            <img
              src={thumbnailUrl}
              alt="Preview"
              className="rounded-3 mt-2"
              style={{
                height: "60px",
                width: "100px",
                objectFit: "cover",
                border: "1px solid var(--color-grey-200)",
              }}
            />
          )}
        </div>

        <div className="row g-3">
          <div className="col-6">
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Price
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              style={inputStyle}
              placeholder="49.99"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Must be 0 or more" },
              })}
            />
            {errors.price && (
              <span className="text-danger small">{errors.price.message}</span>
            )}
          </div>
          <div className="col-6">
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Status
            </label>
            <select
              className="form-select"
              style={inputStyle}
              {...register("status")}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || isUploadingImage}
          className="btn w-100 fw-bold mt-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px",
          }}
        >
          {isLoading
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Course"}
        </button>
      </form>
    </Modal>
  );
};

const DeleteCourseModal = ({ isOpen, onClose, tenantId, course }) => {
  const { removeCourse, isLoading } = useDeleteCourse(tenantId);

  const handleDelete = () => {
    removeCourse(course.id, { onSuccess: onClose });
  };

  return (
    <Modal title="Delete Course" isOpen={isOpen} onClose={onClose}>
      <p style={{ color: "var(--color-grey-700)" }}>
        Are you sure you want to delete <strong>{course?.title}</strong>? This
        will also remove its sections and lessons. This action can't be undone.
      </p>
      <div className="d-flex gap-2 mt-3">
        <button
          onClick={onClose}
          className="btn flex-grow-1 fw-semibold"
          style={{
            backgroundColor: "var(--color-grey-100)",
            color: "var(--color-grey-800)",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="btn flex-grow-1 fw-bold"
          style={{ backgroundColor: "#dc2626", color: "#fff" }}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

const Courses = () => {
  const navigate = useNavigate();
  const { data: profile } = useTeacherProfile();
  const tenantId = profile?.tenant_id;

  const { data: courses, isLoading, error } = useTenantCourses(tenantId);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openCreate = () => {
    setEditTarget(null);
    setIsFormOpen(true);
  };

  const openEdit = (course) => {
    setEditTarget(course);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div style={{ color: "var(--color-grey-700)" }}>Loading courses...</div>
    );
  }

  if (error) {
    return (
      <div className="text-danger">Error loading courses: {error.message}</div>
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
            Courses
          </h2>
          <p className="m-0" style={{ color: "var(--color-grey-500)" }}>
            {courses?.length ?? 0} course{courses?.length === 1 ? "" : "s"} in
            your academy
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn fw-bold d-flex align-items-center gap-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px 18px",
          }}
        >
          <FaPlus /> Create Course
        </button>
      </div>

      {courses?.length === 0 ? (
        <div
          className="text-center p-5 rounded-3"
          style={{
            backgroundColor: "var(--color-grey-0)",
            border: "1px dashed var(--color-grey-300)",
          }}
        >
          <FaBook size={32} style={{ color: "var(--color-grey-400)" }} />
          <p className="mt-3 mb-0" style={{ color: "var(--color-grey-500)" }}>
            No courses yet. Create your first course to start building a
            curriculum.
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {courses.map((course) => (
            <div key={course.id} className="col-12 col-md-6 col-lg-4">
              <div
                className="rounded-3 h-100 d-flex flex-column overflow-hidden"
                style={{
                  backgroundColor: "var(--color-grey-0)",
                  border: "1px solid var(--color-grey-200)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: "140px",
                    backgroundColor: "var(--color-grey-100)",
                  }}
                >
                  <FaBook
                    size={28}
                    style={{ color: "var(--color-grey-400)" }}
                  />
                </div>

                <div className="p-3 d-flex flex-column flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h5
                      className="fw-bold m-0"
                      style={{ color: "var(--color-grey-900)" }}
                    >
                      {course.title}
                    </h5>
                    <span
                      className="badge rounded-pill"
                      style={statusBadge(course.status)}
                    >
                      {course.status}
                    </span>
                  </div>

                  <p
                    className="mb-3 flex-grow-1"
                    style={{
                      color: "var(--color-grey-500)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {course.description || "No description yet."}
                  </p>

                  <div
                    className="fw-bold mb-3"
                    style={{ color: "var(--color-brand-600)" }}
                  >
                    ${Number(course.price ?? 0).toFixed(2)}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/courses/${course.id}`)
                      }
                      className="btn btn-sm flex-grow-1 fw-semibold d-flex align-items-center justify-content-center gap-2"
                      style={{
                        backgroundColor: "var(--color-brand-600)",
                        color: "var(--color-blue-text)",
                      }}
                    >
                      <FaLayerGroup /> Curriculum
                    </button>
                    <button
                      onClick={() => openEdit(course)}
                      className="btn btn-sm"
                      style={{
                        border: "1px solid var(--color-grey-300)",
                        color: "var(--color-grey-700)",
                      }}
                      title="Edit course"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(course)}
                      className="btn btn-sm"
                      style={{
                        border: "1px solid var(--color-grey-300)",
                        color: "#dc2626",
                      }}
                      title="Delete course"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CourseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        tenantId={tenantId}
        course={editTarget}
      />

      <DeleteCourseModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        tenantId={tenantId}
        course={deleteTarget}
      />
    </div>
  );
};

export default Courses;
