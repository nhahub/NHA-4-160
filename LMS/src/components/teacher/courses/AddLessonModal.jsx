import { useState } from "react";
import { uploadVideoToCloudinary } from "../../../services/cloudinaryService";

export default function AddLessonModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
  });

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!open) return null;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      const uploadedUrl = await uploadVideoToCloudinary(file, setProgress);
      setFormData((prev) => ({
        ...prev,
        video_url: uploadedUrl,
      }));
    } catch (err) {
      console.error(err);
      alert("حصل خطأ أثناء رفع الفيديو");
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      video_url: "",
    });
  }

  return (
    <div className="modal-overlay">
      <div className="course-modal">
        <div className="modal-header">
          <h2>Add Lesson</h2>

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
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Lesson Title"
              required
            />
          </div>

          <div className="form-group">
            <label>ارفع فيديو الدرس</label>

            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
            />

            {uploading && <p>جاري الرفع... {progress}%</p>}

            {formData.video_url && !uploading && (
              <div>
                <p>✅ الفيديو اترفع بنجاح</p>
                <video
                  src={formData.video_url}
                  controls
                  width="300"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
          >
            {loading ? "Saving..." : "Save Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
}