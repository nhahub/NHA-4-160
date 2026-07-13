import { useState } from "react";
import { useParams } from "react-router-dom";

import { useCourseCurriculum } from "../../hooks/useCourseCurriculum";
import { useTeacherProfile } from "../../hooks/useTeacherProfile";

import { useCreateSection } from "../../hooks/useCreateSection";
import { useCreateLesson } from "../../hooks/UseCreateLesson";
import { useDeleteSection } from "../../hooks/useDeleteSection";
import { useUpdateSection } from "../../hooks/useUpdateSection";

import AddSectionModal from "../../components/teacher/courses/AddSectionModal";
import AddLessonModal from "../../components/teacher/courses/AddLessonModal";
import EditSectionModal from "../../components/teacher/courses/EditSectionModal";
import { useDeleteLesson } from "../../hooks/useDeleteLesson";
import { useUpdateLesson } from "../../hooks/useUpdateLesson";
import EditLessonModal from "../../components/teacher/courses/EditLessonModal";
import { useUpdateSectionsOrder } from "../../hooks/useUpdateSectionsOrder";
import { useUpdateLessonsOrder } from "../../hooks/useUpdateLessonsOrder";

export default function CourseBuilder() {
  const { courseId } = useParams();
  

  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [openLessonModal, setOpenLessonModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [openEditLessonModal, setOpenEditLessonModal] = useState(false);

  const { data: teacher } = useTeacherProfile();
  const [openSections, setOpenSections] = useState({});

  const {
    data: course,
    isLoading,
    error,
  } = useCourseCurriculum(courseId);

  const {
    mutate: createSection,
    isPending: sectionLoading,
  } = useCreateSection();
  const { mutate: updateSectionsOrder } = useUpdateSectionsOrder();

  const {
    mutate: createLesson,
    isPending: lessonLoading,
  } = useCreateLesson();
  const { mutate: updateLessonsOrder } = useUpdateLessonsOrder();


  const { mutate: removeSection } = useDeleteSection();

  const {
    mutate: updateSection,
    isPending: updateLoading,
  } = useUpdateSection();
  const { mutate: removeLesson } = useDeleteLesson();
  const {
    mutate: updateLesson,
    isPending: updateLessonLoading,
  } = useUpdateLesson();
  const [playingLesson, setPlayingLesson] = useState(null);



  function handleDeleteLesson(id) {
    if (!window.confirm("Delete this lesson?")) return;
  
    removeLesson(id);
  }
  function handleUpdateLesson(data) {
    updateLesson(
      {
        id: selectedLesson.id,
        values: {
          title: data.title,
          video_url: data.video_url,
        },
      },
      {
        onSuccess: () => {
          setOpenEditLessonModal(false);
        },
      }
    );
  }

  function handleCreateSection(title) {
    createSection(
      {
        title,
        tenant_id: teacher.tenant_id,
        course_id: courseId,
        section_order: (course.sections?.length || 0) + 1,
      },
      {
        onSuccess: () => {
          setOpenSectionModal(false);
        },
      }
    );
  }

  function handleCreateLesson(data) {
    createLesson(
      {
        title: data.title,
        video_url: data.video_url,
        tenant_id: teacher.tenant_id,
        course_id: courseId,
        section_id: selectedSection.id,
        lesson_order: (selectedSection.lessons?.length || 0) + 1,
      },
      {
        onSuccess: () => {
          setOpenLessonModal(false);
        },
      }
    );
  }

  function handleDeleteSection(id) {
    if (!window.confirm("Delete this section?")) return;

    removeSection(id);
  }

  function handleUpdateSection(title) {
    updateSection(
      {
        id: selectedSection.id,
        values: {
          title,
        },
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
        },
      }
    );
  }
  function moveSectionUp(index) {
    if (index === 0) return;
  
    const sections = [...course.sections];
  
    [sections[index - 1], sections[index]] = [
      sections[index],
      sections[index - 1],
    ];
  
    updateSectionsOrder(sections);
  }
  
  function moveSectionDown(index) {
    if (index === course.sections.length - 1) return;
  
    const sections = [...course.sections];
  
    [sections[index], sections[index + 1]] = [
      sections[index + 1],
      sections[index],
    ];
  
    updateSectionsOrder(sections);
  }
  function moveLessonUp(section, lessonIndex) {
    if (lessonIndex === 0) return;
  
    const lessons = [...section.lessons];
  
    [lessons[lessonIndex - 1], lessons[lessonIndex]] = [
      lessons[lessonIndex],
      lessons[lessonIndex - 1],
    ];
  
    updateLessonsOrder(lessons);
  }
  
  function moveLessonDown(section, lessonIndex) {
    if (lessonIndex === section.lessons.length - 1) return;
  
    const lessons = [...section.lessons];
  
    [lessons[lessonIndex], lessons[lessonIndex + 1]] = [
      lessons[lessonIndex + 1],
      lessons[lessonIndex],
    ];
  
    updateLessonsOrder(lessons);
  }
  function toggleSection(id) {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong.</h2>;
  
  return (
    <div className="courses-page">
      <h1>{course.title}</h1>

      <p>{course.description}</p>

      <button
        className="add-course-btn"
        onClick={() => setOpenSectionModal(true)}
      >
        + Add Section
      </button>

      <hr />

      {course.sections?.length ? (
        course.sections.map((section, index) => (
          <div className="section-card">
           <div className="section-header">
           <div
  className="section-title"
  onClick={() => toggleSection(section.id)}
>
  <span
    className={`section-arrow ${
      openSections[section.id] ? "open" : ""
    }`}
  >
    ▶
  </span>

  <h3>{section.title}</h3>

  <span className="lesson-count">
    {section.lessons?.length || 0} Lessons
  </span>
</div>

              <div className="section-actions">
                <button
                  className="add-course-btn"
                  onClick={() => {
                    setSelectedSection(section);
                    setOpenLessonModal(true);
                  }}
                >
                  + Add Lesson
                </button>

                <button
  className="order-btn"
  onClick={() => moveSectionUp(index)}
  disabled={index === 0}
>
  ↑
</button>

<button
  className="order-btn"
  onClick={() => moveSectionDown(index)}
  disabled={index === course.sections.length - 1}
>
  ↓
</button>
                <button
  className="edit-btn"
                  onClick={() => {
                    setSelectedSection(section);
                    setOpenEditModal(true);
                  }}
                >
                  Edit
                </button>

<button
  className="delete-btn"
                  onClick={() => handleDeleteSection(section.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {openSections[section.id] && (
  <ul className="lesson-list">

    {section.lessons?.length ? (
      section.lessons.map((lesson, lessonIndex) => (
        <li className="lesson-item">
          <div className="lesson-info">
  <button
    className="lesson-icon"
    onClick={() => setPlayingLesson(lesson)}
    style={{ cursor: "pointer", border: "none", background: "none" }}
  >
    ▶
  </button>
  <span>{lesson.title}</span>
</div>
          <div className="lesson-actions">
            <button
              className="order-btn"
              onClick={() => moveLessonUp(section, lessonIndex)}
              disabled={lessonIndex === 0}
            >
              ↑
            </button>

            <button
              className="order-btn"
              onClick={() => moveLessonDown(section, lessonIndex)}
              disabled={lessonIndex === section.lessons.length - 1}
            >
              ↓
            </button>

            <button
              onClick={() => {
                setSelectedLesson(lesson);
                setOpenEditLessonModal(true);
              }}
              className="edit-btn"
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteLesson(lesson.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <p>No Lessons Yet</p>
    )}

  </ul>
)}
          </div>
        ))
      ) : (
        <p>No Sections Yet</p>
      )}

      <AddSectionModal
        open={openSectionModal}
        onClose={() => setOpenSectionModal(false)}
        onSubmit={handleCreateSection}
        loading={sectionLoading}
      />

      <AddLessonModal
        open={openLessonModal}
        onClose={() => setOpenLessonModal(false)}
        onSubmit={handleCreateLesson}
        loading={lessonLoading}
      />

      <EditSectionModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        section={selectedSection}
        onSubmit={handleUpdateSection}
        loading={updateLoading}
      />
      <EditLessonModal
  open={openEditLessonModal}
  onClose={() => setOpenEditLessonModal(false)}
  lesson={selectedLesson}
  onSubmit={handleUpdateLesson}
  loading={updateLessonLoading}
/>
{playingLesson && (
  <div
    className="modal-overlay"
    onClick={() => setPlayingLesson(null)}
  >
    <div
      className="course-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <h2>{playingLesson.title}</h2>

        <button
          className="close-btn"
          onClick={() => setPlayingLesson(null)}
        >
          ✕
        </button>
      </div>

      {playingLesson.video_url ? (
        <video
          src={playingLesson.video_url}
          controls
          autoPlay
          width="100%"
        />
      ) : (
        <p>لا يوجد فيديو لهذا الدرس</p>
      )}
    </div>
  </div>
)}
    </div>
  );
}