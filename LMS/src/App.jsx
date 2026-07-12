import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useParams,
} from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import TeacherLayout from "./layouts/TeacherLayout";
import AcademyHome from "./pages/student/AcademyHome";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import TeacherDashboardPage from "./pages/teacher/Dashboard";
import TeacherCoursesPage from "./pages/teacher/Courses";
import TeacherCourseBuilderPage from "./pages/teacher/CourseBuilder";
import TeacherStudentsPage from "./pages/teacher/Students";
import TeacherSettingsPage from "./pages/teacher/Settings";

const StudentLayout = () => {
  const { tenantId } = useParams();
  return (
    <div>
      <nav>{tenantId} Navbar</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const AdminStats = () => <div>System Stats Content</div>;
const AdminTenants = () => <div>Manage Tenants Content</div>;
const AdminSettings = () => <div>Admin Settings Content</div>;


const StudentLogin = () => <div>Student Login Content</div>;
const CourseDetails = () => <div>Course Details Content</div>;
const CoursePlayer = () => <div>Course Player Content</div>;

const NotFound = () => <div>404 Not Found</div>;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route index element={<AdminStats />} />
            <Route path="tenants" element={<AdminTenants />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/dashboard" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboardPage />} />
            <Route path="courses" element={<TeacherCoursesPage />} />
            <Route path="courses/:courseId" element={<TeacherCourseBuilderPage />} />
            <Route path="students" element={<TeacherStudentsPage />} />
            <Route path="settings" element={<TeacherSettingsPage />} />
          </Route>

          <Route path="/:tenantId" element={<StudentLayout />}>
            <Route index element={<AcademyHome />} />
            <Route path="login" element={<StudentLogin />} />
            <Route path="course/:courseId" element={<CourseDetails />} />
            <Route path="learn/:courseId" element={<CoursePlayer />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
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
