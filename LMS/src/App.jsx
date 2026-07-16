import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "./styles/App.css";

const LandingPage = lazy(() => import("./pages/public/LandingPage"));
const NotFound = lazy(() => import("./pages/public/NotFound"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

const SuperAdminLayout = lazy(() => import("./layouts/SuperAdminLayout"));
const AdminPlans = lazy(() => import("./pages/superAdmin/AdminPlans"));
const AdminTenants = lazy(() => import("./pages/superAdmin/AdminTenants"));
const AdminStats = lazy(() => import("./pages/superAdmin/AdminStats"));
const AdminUsers = lazy(() => import("./pages/superAdmin/AdminUsers"));
const AdminSettings = lazy(() => import("./pages/superAdmin/AdminSettings"));

const TeacherLayout = lazy(() => import("./layouts/TeacherLayout"));
const TeacherDashboardPage = lazy(() => import("./pages/teacher/Dashboard"));
const TeacherCoursesPage = lazy(() => import("./pages/teacher/Courses"));
const TeacherCourseBuilderPage = lazy(
  () => import("./pages/teacher/CourseBuilder"),
);
const TeacherStudentsPage = lazy(() => import("./pages/teacher/Students"));
const TeacherSettingsPage = lazy(() => import("./pages/teacher/Settings"));

const StudentLayout = lazy(() => import("./layouts/StudentLayout"));
const AcademyHome = lazy(() => import("./pages/student/AcademyHome"));
const CourseDetails = lazy(() => import("./pages/student/CourseDetails"));
const StudentProfile = lazy(() => import("./pages/student/StudentProfile"));
const CoursePlayer = lazy(() => import("./pages/student/CoursePlayer"));
const BuyCourses = lazy(() => import("./pages/student/BuyCourses"));
const AcademyAbout = lazy(() => import("./pages/student/AcademyAbout"));
const MyCourses = lazy(() => import("./pages/student/MyCourses"));

const PageLoader = () => (
  <div
    className="vh-100 d-flex justify-content-center align-items-center"
    style={{ backgroundColor: "var(--color-grey-50)" }}
  >
    <Spinner animation="border" style={{ color: "var(--color-brand-600)" }} />
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route index element={<AdminStats />} />
              <Route path="tenants" element={<AdminTenants />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="plans" element={<AdminPlans />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="/dashboard" element={<TeacherLayout />}>
              <Route index element={<TeacherDashboardPage />} />
              <Route path="courses" element={<TeacherCoursesPage />} />
              <Route
                path="courses/:courseId"
                element={<TeacherCourseBuilderPage />}
              />
              <Route path="students" element={<TeacherStudentsPage />} />
              <Route path="settings" element={<TeacherSettingsPage />} />
            </Route>

            <Route path="/:tenantId" element={<StudentLayout />}>
              <Route index element={<AcademyHome />} />
              <Route path="course/:courseId" element={<CourseDetails />} />
              <Route path="about" element={<AcademyAbout />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="buy" element={<BuyCourses />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="learn/:courseId" element={<CoursePlayer />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 4000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
