import { useState } from "react";
import { uploadCourseImage } from "../../../services/storageApi";
import { useEffect } from "react";
export default function CourseForm({
    onSubmit,
    loading = false,
    initialData,
  }) {
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail_url: "",
    status: "draft",
  });
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const imageUrl = await uploadCourseImage(file);

      setFormData((prev) => ({
        ...prev,
        thumbnail_url: imageUrl,
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <div className="form-group">
        <label>Course Title</label>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>Price</label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Course Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {uploading && <p>Uploading image...</p>}

        {formData.thumbnail_url && (
          <img
          src={formData.thumbnail_url}
          alt="Preview"
          style={{
            width: "120px",
            height: "80px",
            objectFit: "cover",
            marginTop: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
        )}
      </div>

      <div className="form-group">
        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button disabled={loading || uploading}>
        {loading
          ? "Saving..."
          : uploading
          ? "Uploading..."
          : "Save Course"}
      </button>
    </form>
  );
}