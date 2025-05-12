import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/bookings/my-bookings");
      setBookings(response.data.data);
    } catch (error) {
      toast.error("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: "Cancel Booking",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/bookings/${bookingId}/cancel`);
        toast.success("Booking cancelled successfully");
        fetchBookings();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to cancel booking"
        );
      }
    }
  };

  const handleEditBooking = async (booking) => {
    const { value: ticketCount } = await Swal.fire({
      title: "Edit Booking",
      text: "Enter new number of tickets",
      input: "number",
      inputValue: booking.quantity,
      inputAttributes: {
        min: 1,
        step: 1,
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value || value < 1) {
          return "Please enter a valid number of tickets";
        }
      },
    });

    if (ticketCount) {
      try {
        await axios.patch(`/api/bookings/${booking._id}`, {
          ticketCount: parseInt(ticketCount),
        });
        toast.success("Booking updated successfully");
        fetchBookings();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to update booking"
        );
      }
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            You haven't made any bookings yet.
          </p>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {booking.event.name}
                  </h2>
                  <div className="space-y-1 text-gray-600 dark:text-gray-300">
                    <p>
                      Date: {new Date(booking.event.date).toLocaleDateString()}
                    </p>
                    <p>Location: {booking.event.venue}</p>
                    <p>Tickets: {booking.quantity}</p>
                    <p>
                      Total: $
                      {(booking.event.price * booking.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/event/${booking.event._id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    View Event
                  </Link>
                  {new Date(booking.event.date) > new Date() && (
                    <>
                      <button
                        onClick={() => handleEditBooking(booking)}
                        className="text-green-500 hover:text-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
