import { Outlet } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import Dashbourd from "../features/AdminDashbourd/dashbourd";

const TeacherLayout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <div>
      <Dashbourd />

      <div className="p-3 d-flex justify-content-end">
        <button
          className="btn btn-outline-danger"
          onClick={logout}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>

      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout;
