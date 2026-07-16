import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Placeholder } from "react-bootstrap";
import {
  FaArrowLeft,
  FaPlus,
  FaPen,
  FaTrash,
  FaChevronUp,
  FaChevronDown,
  FaPlayCircle,
  FaLayerGroup,
} from "react-icons/fa";
import { useCourseCurriculum } from "../../hooks/useCourseCurriculum";
import { useAddSection } from "../../hooks/useAddSection";
import { useUpdateSection } from "../../hooks/useUpdateSection";
import { useDeleteSection } from "../../hooks/useDeleteSection";
import { useReorderSections } from "../../hooks/useReorderSections";
import { useAddLesson } from "../../hooks/useAddLesson";
import { useUpdateLesson } from "../../hooks/useUpdateLesson";
import { useDeleteLesson } from "../../hooks/useDeleteLesson";
import { useReorderLessons } from "../../hooks/useReorderLessons";
import { uploadVideoToCloudinary } from "../../services/cloudinaryService";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";

const inputStyle = {
  backgroundColor: "var(--color-grey-50)",
  color: "var(--color-grey-900)",
  borderColor: "var(--color-grey-300)",
};

const cardStyle = {
  backgroundColor: "var(--color-grey-0)",
  border: "1px solid var(--color-grey-200)",
  boxShadow: "var(--shadow-sm)",
};

const ReorderButtons = ({ onUp, onDown, disableUp, disableDown }) => (
  <div className="d-flex flex-column">
    <button
      onClick={onUp}
      disabled={disableUp}
      className="btn btn-sm p-0"
      style={{
        color: disableUp ? "var(--color-grey-300)" : "var(--color-grey-600)",
        lineHeight: 1,
      }}
      title="Move up"
    >
      <FaChevronUp size={12} />
    </button>
    <button
      onClick={onDown}
      disabled={disableDown}
      className="btn btn-sm p-0"
      style={{
        color: disableDown ? "var(--color-grey-300)" : "var(--color-grey-600)",
        lineHeight: 1,
      }}
      title="Move down"
    >
      <FaChevronDown size={12} />
    </button>
  </div>
);

const LessonFormModal = ({
  isOpen,
  onClose,
  courseId,
  sectionId,
  lesson,
  nextOrder,
}) => {
  const isEditing = !!lesson;
  const { createLesson, isLoading: isCreating } = useAddLesson(courseId);
  const { editLesson, isLoading: isEditingLoading } = useUpdateLesson(courseId);
  const isLoading = isCreating || isEditingLoading;

  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    values: {
      title: lesson?.title ?? "",
      videoUrl: lesson?.video_url ?? "",
    },
  });

  const currentVideoUrl = watch("videoUrl");

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploadingVideo(true);
      const url = await uploadVideoToCloudinary(file, setUploadProgress);
      setValue("videoUrl", url);
      toast.success("Video uploaded!");
    } catch (err) {
      toast.error("Failed to upload video");
    } finally {
      setIsUploadingVideo(false);
      setUploadProgress(0);
    }
  };

  const onSubmit = (data) => {
    if (isEditing) {
      editLesson(
        {
          lessonId: lesson.id,
          updates: { title: data.title, video_url: data.videoUrl },
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    } else {
      createLesson(
        {
          section_id: sectionId,
          title: data.title,
          video_url: data.videoUrl,
          lesson_order: nextOrder,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Lesson" : "Add Lesson"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3"
      >
        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Lesson Title
          </label>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            placeholder="Introduction to Flexbox"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-danger small">{errors.title.message}</span>
          )}
        </div>

        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Upload Video
          </label>
          <input
            type="file"
            accept="video/*"
            className="form-control mb-2"
            style={inputStyle}
            onChange={handleVideoUpload}
            disabled={isUploadingVideo}
          />

          {isUploadingVideo && (
            <div
              className="progress mt-2 mb-2"
              style={{
                height: "8px",
                backgroundColor: "var(--color-grey-200)",
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${uploadProgress}%`,
                  backgroundColor: "var(--color-brand-600)",
                }}
              ></div>
            </div>
          )}

          {currentVideoUrl && !isUploadingVideo && (
            <div className="alert alert-success p-2 small m-0 mt-2 fw-semibold">
              Video uploaded successfully!
            </div>
          )}

          <input
            type="hidden"
            {...register("videoUrl", { required: "Please upload a video" })}
          />
          {errors.videoUrl && (
            <span className="text-danger small">{errors.videoUrl.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isUploadingVideo}
          className="btn w-100 fw-bold mt-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px",
          }}
        >
          {isLoading ? "Saving..." : isEditing ? "Save Changes" : "Add Lesson"}
        </button>
      </form>
    </Modal>
  );
};

const LessonRow = ({
  lesson,
  index,
  total,
  courseId,
  sectionId,
  allLessons,
}) => {
  const { removeLesson } = useDeleteLesson(courseId);
  const { moveLessons } = useReorderLessons(courseId);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const swapWith = (targetIndex) => {
    const a = allLessons[index];
    const b = allLessons[targetIndex];
    moveLessons([
      { id: a.id, lesson_order: b.lesson_order },
      { id: b.id, lesson_order: a.lesson_order },
    ]);
  };

  return (
    <div
      className="d-flex align-items-center gap-3 p-2 rounded-3"
      style={{ borderBottom: "1px solid var(--color-grey-100)" }}
    >
      <ReorderButtons
        onUp={() => swapWith(index - 1)}
        onDown={() => swapWith(index + 1)}
        disableUp={index === 0}
        disableDown={index === total - 1}
      />
      <FaPlayCircle style={{ color: "var(--color-grey-400)" }} />
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <div
          className="fw-semibold text-truncate"
          style={{ color: "var(--color-grey-900)" }}
        >
          {lesson.title}
        </div>
        <div
          className="text-truncate"
          style={{ color: "var(--color-grey-500)", fontSize: "0.8rem" }}
        >
          {lesson.video_url}
        </div>
      </div>
      <button
        onClick={() => setIsEditOpen(true)}
        className="btn btn-sm"
        style={{ color: "var(--color-grey-600)" }}
        title="Edit lesson"
      >
        <FaPen size={13} />
      </button>
      <button
        onClick={() => removeLesson(lesson.id)}
        className="btn btn-sm"
        style={{ color: "#dc2626" }}
        title="Delete lesson"
      >
        <FaTrash size={13} />
      </button>

      <LessonFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        courseId={courseId}
        sectionId={sectionId}
        lesson={lesson}
      />
    </div>
  );
};

const SectionCard = ({ section, index, total, courseId, allSections }) => {
  const { editSection } = useUpdateSection(courseId);
  const { removeSection } = useDeleteSection(courseId);
  const { moveSections } = useReorderSections(courseId);

  const [isRenaming, setIsRenaming] = useState(false);
  const [titleDraft, setTitleDraft] = useState(section.title);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);

  const lessons = useMemo(
    () =>
      [...(section.lessons ?? [])].sort(
        (a, b) => (a.lesson_order ?? 0) - (b.lesson_order ?? 0),
      ),
    [section.lessons],
  );

  const swapWith = (targetIndex) => {
    const a = allSections[index];
    const b = allSections[targetIndex];
    moveSections([
      { id: a.id, section_order: b.section_order },
      { id: b.id, section_order: a.section_order },
    ]);
  };

  const saveRename = () => {
    if (titleDraft.trim() && titleDraft !== section.title) {
      editSection({
        sectionId: section.id,
        updates: { title: titleDraft.trim() },
      });
    }
    setIsRenaming(false);
  };

  return (
    <div className="rounded-3 mb-3" style={cardStyle}>
      <div
        className="d-flex align-items-center gap-3 p-3"
        style={{ borderBottom: "1px solid var(--color-grey-100)" }}
      >
        <ReorderButtons
          onUp={() => swapWith(index - 1)}
          onDown={() => swapWith(index + 1)}
          disableUp={index === 0}
          disableDown={index === total - 1}
        />
        <FaLayerGroup style={{ color: "var(--color-brand-600)" }} />

        {isRenaming ? (
          <input
            autoFocus
            type="text"
            className="form-control form-control-sm"
            style={{ ...inputStyle, maxWidth: "320px" }}
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={saveRename}
            onKeyDown={(e) => e.key === "Enter" && saveRename()}
          />
        ) : (
          <h6
            className="fw-bold m-0 flex-grow-1"
            style={{ color: "var(--color-grey-900)" }}
          >
            {section.title}
          </h6>
        )}

        <button
          onClick={() => setIsRenaming(true)}
          className="btn btn-sm"
          style={{ color: "var(--color-grey-600)" }}
          title="Rename section"
        >
          <FaPen size={13} />
        </button>
        <button
          onClick={() => removeSection(section.id)}
          className="btn btn-sm"
          style={{ color: "#dc2626" }}
          title="Delete section"
        >
          <FaTrash size={13} />
        </button>
      </div>

      <div className="p-2">
        {lessons.length === 0 ? (
          <p
            className="m-0 p-3 text-center"
            style={{ color: "var(--color-grey-400)" }}
          >
            No lessons yet.
          </p>
        ) : (
          lessons.map((lesson, i) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              index={i}
              total={lessons.length}
              courseId={courseId}
              sectionId={section.id}
              allLessons={lessons}
            />
          ))
        )}

        <button
          onClick={() => setIsAddLessonOpen(true)}
          className="btn btn-sm fw-semibold d-flex align-items-center gap-2 mt-2"
          style={{ color: "var(--color-brand-600)" }}
        >
          <FaPlus size={12} /> Add Lesson
        </button>
      </div>

      <LessonFormModal
        isOpen={isAddLessonOpen}
        onClose={() => setIsAddLessonOpen(false)}
        courseId={courseId}
        sectionId={section.id}
        nextOrder={lessons.length}
      />
    </div>
  );
};

const AddSectionForm = ({ courseId, nextOrder }) => {
  const { createSection, isLoading } = useAddSection(courseId);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    createSection(
      { title: title.trim(), section_order: nextOrder },
      { onSuccess: () => setTitle("") },
    );
  };

  return (
    <div className="d-flex gap-2">
      <input
        type="text"
        className="form-control"
        style={inputStyle}
        placeholder="New section title (e.g. Getting Started)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button
        onClick={handleAdd}
        disabled={isLoading}
        className="btn fw-semibold d-flex align-items-center gap-2 flex-shrink-0"
        style={{
          backgroundColor: "var(--color-brand-600)",
          color: "var(--color-blue-text)",
        }}
      >
        <FaPlus size={12} /> Add Section
      </button>
    </div>
  );
};

const CourseBuilder = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useCourseCurriculum(courseId);

  const sections = useMemo(
    () =>
      [...(course?.sections ?? [])].sort(
        (a, b) => (a.section_order ?? 0) - (b.section_order ?? 0),
      ),
    [course?.sections],
  );

  if (isLoading) {
    return (
      <div>
        <Placeholder as="div" animation="glow" className="mb-3">
          <Placeholder
            xs={2}
            className="rounded-2"
            style={{ backgroundColor: "var(--color-grey-200)", height: "20px" }}
          />
        </Placeholder>

        <div className="mb-4">
          <Placeholder as="h2" animation="glow" className="mb-1">
            <Placeholder
              xs={5}
              md={3}
              className="rounded-3"
              style={{
                backgroundColor: "var(--color-grey-300)",
                height: "32px",
              }}
            />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="m-0">
            <Placeholder
              xs={8}
              md={5}
              className="rounded-2"
              style={{
                backgroundColor: "var(--color-grey-200)",
                height: "20px",
              }}
            />
          </Placeholder>
        </div>

        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-3 mb-3 p-0"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-200)",
            }}
          >
            <div
              className="d-flex align-items-center gap-3 p-3"
              style={{ borderBottom: "1px solid var(--color-grey-100)" }}
            >
              <Placeholder
                animation="glow"
                className="w-100 d-flex align-items-center gap-3"
              >
                <Placeholder
                  xs={1}
                  className="rounded-2"
                  style={{
                    backgroundColor: "var(--color-grey-200)",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Placeholder
                  xs={1}
                  className="rounded-2"
                  style={{
                    backgroundColor: "var(--color-grey-200)",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <Placeholder
                  xs={4}
                  className="rounded-2 flex-grow-1"
                  style={{
                    backgroundColor: "var(--color-grey-300)",
                    height: "24px",
                  }}
                />
                <Placeholder
                  xs={1}
                  className="rounded-2"
                  style={{
                    backgroundColor: "var(--color-grey-200)",
                    width: "24px",
                    height: "24px",
                  }}
                />
                <Placeholder
                  xs={1}
                  className="rounded-2"
                  style={{
                    backgroundColor: "var(--color-grey-200)",
                    width: "24px",
                    height: "24px",
                  }}
                />
              </Placeholder>
            </div>
            <div className="p-2">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="d-flex align-items-center gap-3 p-2 rounded-3"
                  style={{ borderBottom: "1px solid var(--color-grey-100)" }}
                >
                  <Placeholder
                    animation="glow"
                    className="w-100 d-flex align-items-center gap-3"
                  >
                    <Placeholder
                      xs={1}
                      className="rounded-2"
                      style={{
                        backgroundColor: "var(--color-grey-200)",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <Placeholder
                      xs={1}
                      className="rounded-2"
                      style={{
                        backgroundColor: "var(--color-grey-200)",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <div className="flex-grow-1">
                      <Placeholder
                        xs={5}
                        className="rounded-2 mb-1 d-block"
                        style={{ backgroundColor: "var(--color-grey-300)" }}
                      />
                      <Placeholder
                        xs={3}
                        className="rounded-2 d-block"
                        style={{ backgroundColor: "var(--color-grey-200)" }}
                      />
                    </div>
                  </Placeholder>
                </div>
              ))}
              <Placeholder animation="glow" className="mt-2">
                <Placeholder
                  xs={2}
                  className="rounded-2"
                  style={{
                    backgroundColor: "var(--color-grey-200)",
                    height: "28px",
                  }}
                />
              </Placeholder>
            </div>
          </div>
        ))}
        <div
          className="rounded-3 p-3 d-flex gap-2"
          style={{
            backgroundColor: "var(--color-grey-0)",
            border: "1px solid var(--color-grey-200)",
          }}
        >
          <Placeholder animation="glow" className="w-100 d-flex gap-2">
            <Placeholder
              className="rounded-2 flex-grow-1"
              style={{
                backgroundColor: "var(--color-grey-100)",
                height: "40px",
              }}
            />
            <Placeholder
              className="rounded-2"
              style={{
                backgroundColor: "var(--color-grey-200)",
                width: "120px",
                height: "40px",
              }}
            />
          </Placeholder>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-danger">Error loading course: {error.message}</div>
    );
  }

  return (
    <div>
      <Link
        to="/dashboard/courses"
        className="d-inline-flex align-items-center gap-2 text-decoration-none mb-3"
        style={{ color: "var(--color-grey-500)" }}
      >
        <FaArrowLeft size={12} /> Back to Courses
      </Link>

      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: "var(--color-grey-900)" }}>
          {course?.title}
        </h2>
        <p className="m-0" style={{ color: "var(--color-grey-500)" }}>
          Build your curriculum: add sections, then add lessons inside each one.
        </p>
      </div>

      {sections.length === 0 ? (
        <div
          className="text-center p-5 rounded-3 mb-3"
          style={{
            backgroundColor: "var(--color-grey-0)",
            border: "1px dashed var(--color-grey-300)",
          }}
        >
          <FaLayerGroup size={28} style={{ color: "var(--color-grey-400)" }} />
          <p className="mt-3 mb-0" style={{ color: "var(--color-grey-500)" }}>
            No sections yet. Add your first section below to start building the
            curriculum.
          </p>
        </div>
      ) : (
        sections.map((section, i) => (
          <SectionCard
            key={section.id}
            section={section}
            index={i}
            total={sections.length}
            courseId={courseId}
            allSections={sections}
          />
        ))
      )}

      <div className="rounded-3 p-3" style={cardStyle}>
        <AddSectionForm courseId={courseId} nextOrder={sections.length} />
      </div>
    </div>
  );
};

export default CourseBuilder;
