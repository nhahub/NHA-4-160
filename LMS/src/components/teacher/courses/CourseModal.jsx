import CourseForm from "./CourseForm";

export default function CourseModal({
  open,
  onClose,
  onSubmit,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="course-modal">
  
        <div className="modal-header">
          <h2>Create Course</h2>
  
          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
  
        <CourseForm
          onSubmit={onSubmit}
          loading={loading}
        />
  
      </div>
    </div>
  );
}