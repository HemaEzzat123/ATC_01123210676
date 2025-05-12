import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800 dark:text-white">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="text-blue-500 hover:text-blue-600 font-medium">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
