import { useEffect, useState } from "react";

export default function EditLessonModal({
  open,
  onClose,
  lesson,
  onSubmit,
  loading = false,
}) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setVideoUrl(lesson.video_url || "");
    }
  }, [lesson]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      title,
      video_url: videoUrl,
    });
  }

  return (
    <div className="modal-overlay">
      <div className="course-modal">
        <div className="modal-header">
          <h2>Edit Lesson</h2>

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
            <label>Lesson Title</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Video URL</label>

            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
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