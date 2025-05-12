import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-grow p-8 bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
