import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState(["all"]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, [category, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/events/categories");
      setCategories(["all", ...response.data.data]);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const fetchEvents = async () => {
    try {
      let url = `/api/events`;
      const params = [];
      if (category !== "all")
        params.push(`category=${encodeURIComponent(category)}`);
      if (searchTerm) params.push(`search=${encodeURIComponent(searchTerm)}`);
      if (params.length > 0) url += `?${params.join("&")}`;
      const response = await axios.get(url);
      setEvents(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = async (eventId) => {
    if (!user) {
      toast.error("Please login to book tickets");
      navigate("/login");
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to book this event?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.post("/api/bookings", { eventId, ticketCount: 1 });
      toast.success("Booking successful!");
      navigate("/booking-success");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again."
      );
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Upcoming Events
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all"
                  ? "All Categories"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {event.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {event.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <span>{event.venue}</span>
              </div>
              <div className="mt-4">
                {event.isBooked ? (
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                    Booked
                  </span>
                ) : (
                  <button
                    onClick={() => handleBookNow(event._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No events found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
