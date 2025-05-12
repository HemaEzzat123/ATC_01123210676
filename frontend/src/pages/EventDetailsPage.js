import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axios";
import { toast } from "react-toastify";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  const fetchEventDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data.data);
    } catch (error) {
      toast.error("Error fetching event details");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to book tickets");
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    try {
      await axios.post("/api/bookings", {
        eventId: id,
        ticketCount,
      });
      toast.success("Booking successful!");
      navigate("/booking-success");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {event.name}
          </h1>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-6">
            <span>{new Date(event.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{event.venue}</span>
            <span>•</span>
            <span>{event.category}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {event.description}
          </p>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Price per ticket
                </h2>
                <p className="text-2xl font-bold text-blue-500">
                  ${event.price}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={event.isBooked || ticketCount <= 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="text-lg font-semibold min-w-[2rem] text-center">
                  {ticketCount}
                </span>
                <button
                  onClick={() => setTicketCount(ticketCount + 1)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={event.isBooked}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                Total: ${(event.price * ticketCount).toFixed(2)}
              </div>
              {event.isBooked ? (
                <span className="inline-block px-6 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                  Booked
                </span>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingLoading ? "Processing..." : "Book Now"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
