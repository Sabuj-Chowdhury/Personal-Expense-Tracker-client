import { BiErrorAlt } from "react-icons/bi";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-base-200 px-6">
      <BiErrorAlt className="text-red-600 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-error mb-2">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-500 mb-6">
        The page you're looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
