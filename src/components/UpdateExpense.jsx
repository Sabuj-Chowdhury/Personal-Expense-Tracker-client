import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { authHeaders } from "../util/token";
import useAuth from "../hooks/useAuth";

const UpdateExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch single expense
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await axiosPublic.get(`/expenses`, authHeaders(token));
        const expense = res.data.data.find((item) => item._id === id);
        if (!expense) {
          Swal.fire("Not found", "Expense does not exist.", "error");
          return navigate("/expenses");
        }

        setFormData({
          title: expense.title || "",
          amount: expense.amount || "",
          category: expense.category || "",
          date: expense.date?.split("T")[0] || "", // convert ISO to yyyy-mm-dd
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch expense.", "error");
      }
    };

    fetchExpense();
  }, [id, axiosPublic, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      await axiosPublic.patch(`/expenses/${id}`, payload, authHeaders(token));

      Swal.fire("Updated!", "Expense updated successfully.", "success");
      navigate("/expenses");
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Update Expense</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded outline-none"
            required
          />

          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full rounded outline-none"
            required
          />

          {/* Category Dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full rounded outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>

          {/* Date Picker */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 w-full rounded outline-none"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded w-full"
          >
            Update Expense
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateExpense;
