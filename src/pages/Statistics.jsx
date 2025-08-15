import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { authHeaders } from "../util/token";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FF6384",
];

const Statistics = () => {
  const axiosPublic = useAxiosPublic();
  const { token, user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosPublic.get("/expenses", authHeaders(token));
        const userExpenses = res.data.data.filter(
          (expense) => expense.email === user?.email
        );

        // Group by category and sum amounts
        const categoryMap = {};
        userExpenses.forEach((expense) => {
          const { category, amount } = expense;
          if (!categoryMap[category]) {
            categoryMap[category] = 0;
          }
          categoryMap[category] += amount;
        });

        // Format for Recharts
        const formattedData = Object.entries(categoryMap).map(
          ([category, amount]) => ({
            name: category,
            value: amount,
          })
        );

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchExpenses();
  }, [axiosPublic, token, user?.email]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Expenses by Category
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No expense data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={130}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Statistics;
