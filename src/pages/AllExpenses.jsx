import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { authHeaders } from "../util/token";
import toast from "react-hot-toast";

const AllExpenses = () => {
  const axiosPublic = useAxiosPublic();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosPublic.get("/expenses", authHeaders(token));
        const userExpenses = res.data.data.filter(
          (expense) => expense.email === user?.email
        );
        setExpenses(userExpenses);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExpenses();
  }, [axiosPublic, token, user?.email]);

  // Delete function
  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/expenses/${id}`, authHeaders(token));
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Confirmation delete
  const handleCustomDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire({
          title: "Deleted!",
          text: "Expense has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Expenses</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{expense.title}</td>
                  <td className="p-3">${expense.amount}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-3 flex gap-4">
                    <button
                      onClick={() => navigate(`/update-expense/${expense._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleCustomDelete(expense._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllExpenses;
