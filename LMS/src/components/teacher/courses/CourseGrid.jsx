import CourseCard from "./CourseCard";
import EmptyCourses from "./EmptyCourses";

export default function CourseGrid({
  courses,
  onEdit,
  onDelete,
}) {
  if (!courses.length) {
    return <EmptyCourses />;
  }

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}