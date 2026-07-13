import { useState } from "react";

import { useTeacherProfile } from "../../hooks/useTeacherProfile";
import { useCourses } from "../../hooks/useCourses";
import { useCreateCourse } from "../../hooks/useCreateCourse";

import CourseGrid from "../../components/teacher/courses/CourseGrid";
import CourseModal from "../../components/teacher/courses/CourseModal";

import { useUpdateCourse } from "../../hooks/useUpdateCourse";
import { useDeleteCourse } from "../../hooks/useDeleteCourse";
import EditCourseModal from "../../components/teacher/courses/EditCourseModal";

import "../../styles/courses.css";

export default function Courses() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(null);


  const {
    data: teacher,
    isLoading: teacherLoading,
    error: teacherError,
  } = useTeacherProfile();

  const {
    data: courses = [],
    isLoading: coursesLoading,
    error: coursesError,
  } = useCourses(teacher?.tenant_id);

  const { mutate: createCourse, isPending } = useCreateCourse();
  const {
    mutate: updateCourse,
    isPending: updateLoading,
  } = useUpdateCourse();
  
  const {
    mutate: deleteCourse,
  } = useDeleteCourse();


  function handleCreateCourse(formData) {
    createCourse(
      {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
  
        thumbnail_url: formData.thumbnail_url,
  
        status: formData.status,
  
        tenant_id: teacher.tenant_id,
      },
      {
        onSuccess: () => {
          setOpenModal(false);
        },
      }
    );
  }
  function handleUpdateCourse(formData) {
    updateCourse(
      {
        id: selectedCourse.id,
        values: {
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          thumbnail_url: formData.thumbnail_url,
          status: formData.status,
        },
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
        },
      }
    );
  }
  
  function handleDeleteCourse(id) {
    if (!window.confirm("Delete this course?")) return;
  
    deleteCourse(id);
  }

  if (teacherLoading || coursesLoading) {
    return (
      <div className="courses-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (teacherError || coursesError) {
    return (
      <div className="courses-page">
        <h2>Something went wrong.</h2>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div>
          <h1>My Courses</h1>

          <p>
            Academy:
            <strong> {teacher?.tenants?.academy_name}</strong>
          </p>

          <p>Total Courses: {courses.length}</p>
        </div>

        <button
          className="add-course-btn"
          onClick={() => setOpenModal(true)}
        >
          + Create Course
        </button>
      </div>

      <CourseGrid
  courses={courses}
  onEdit={(course) => {
    setSelectedCourse(course);
    setOpenEditModal(true);
  }}
  onDelete={handleDeleteCourse}
/>

      <CourseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateCourse}
        loading={isPending}
      />
      <EditCourseModal
  open={openEditModal}
  onClose={() => setOpenEditModal(false)}
  course={selectedCourse}
  onSubmit={handleUpdateCourse}
  loading={updateLoading}
/>
    </div>
  );
}