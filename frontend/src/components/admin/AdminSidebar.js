import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminSidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/events", label: "Events", icon: "🎉" },
    { path: "/admin/bookings", label: "Bookings", icon: "🎫" },
    { path: "/admin/users", label: "Users", icon: "👥" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <div className="p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Panel
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user?.email}
          </p>
        </div>

        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
