import { useEffect, useState } from "react";
import CourseForm from "./CourseForm";

export default function EditCourseModal({
  open,
  onClose,
  course,
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail_url: "",
    status: "draft",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        price: course.price || "",
        thumbnail_url: course.thumbnail_url || "",
        status: course.status || "draft",
      });
    }
  }, [course]);

  if (!open) return null;

  function handleSubmit(data) {
    onSubmit(data);
  }

  return (
    <div className="modal-overlay">
      <div className="course-modal">
        <div className="modal-header">
          <h2>Edit Course</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <CourseForm
          initialData={formData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}