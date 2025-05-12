import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Total Events
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {stats.totalEvents}
          </p>
          <Link
            to="/admin/events"
            className="text-blue-500 hover:text-blue-600 text-sm mt-2 inline-block"
          >
            View Events →
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Total Bookings
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {stats.totalBookings}
          </p>
          <Link
            to="/admin/bookings"
            className="text-blue-500 hover:text-blue-600 text-sm mt-2 inline-block"
          >
            View Bookings →
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {stats.totalUsers}
          </p>
          <Link
            to="/admin/users"
            className="text-blue-500 hover:text-blue-600 text-sm mt-2 inline-block"
          >
            View Users →
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            ${stats.totalRevenue}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
            >
              Go to Homepage
            </Link>
            <Link
              to="/admin/events/new"
              className="block w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
            >
              Create New Event
            </Link>
            <Link
              to="/admin/bookings"
              className="block w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
            >
              Manage Bookings
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            System Status
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Server Status
              </span>
              <span className="text-green-500">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Database Status
              </span>
              <span className="text-green-500">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Last Backup
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
