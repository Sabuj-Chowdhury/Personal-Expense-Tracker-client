import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto flex items-center justify-center bg-gray-50 p-4 h-full">
      <div className="bg-white rounded-xl shadow-md p-8 w-full  text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Track Your Spending
        </h1>
        <p className="text-gray-600 mb-6">
          Stay on top of your finances by logging your expenses. Click below to
          get started.
        </p>
        <Link
          to="/add-expense"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          Add an Expense
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
