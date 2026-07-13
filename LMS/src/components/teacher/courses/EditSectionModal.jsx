import { useState, useEffect } from "react";

export default function EditSectionModal({
  open,
  onClose,
  section,
  onSubmit,
  loading = false,
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (section) {
      setTitle(section.title);
    }
  }, [section]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(title);
  }

  return (
    <div className="modal-overlay">
      <div className="course-modal">
        <div className="modal-header">
          <h2>Edit Section</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          className="course-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Section Title</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}