import { Link } from "react-router-dom";

const BookingSuccessPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Booking Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your booking. You can view your booking details in your
          profile.
        </p>
        <div className="space-y-4">
          <Link
            to="/profile/my-bookings"
            className="block w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View My Bookings
          </Link>
          <Link
            to="/"
            className="block w-full text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
