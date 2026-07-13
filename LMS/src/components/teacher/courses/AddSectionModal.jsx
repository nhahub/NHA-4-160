import { useState } from "react";

export default function AddSectionModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [title, setTitle] = useState("");

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit(title);

    setTitle("");
  }

  return (
    <div className="modal-overlay">
      <div className="course-modal">
        <div className="modal-header">
          <h2>Add Section</h2>

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
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Section Title"
              required
            />
          </div>

          <button disabled={loading}>
            {loading ? "Saving..." : "Save Section"}
          </button>
        </form>
      </div>
    </div>
  );
}