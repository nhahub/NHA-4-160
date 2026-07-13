import { Link } from "react-router-dom";

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}) {
  return (
    <div className="course-card">
      <img
        className="course-image"
        src={
          course.thumbnail_url ||
          "https://placehold.co/600x350?text=Course"
        }
        alt={course.title}
      />

      <div className="course-body">
        <h3>{course.title}</h3>

        <p>{course.description}</p>

        <div className="course-footer">
          <span>${course.price}</span>

          <div className="course-actions">
            <Link
              to={`/dashboard/courses/${course.id}`}
              className="builder-btn"
            >
              Builder
            </Link>

            <button
              onClick={() => onEdit(course)}
              className="edit-btn"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(course.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}