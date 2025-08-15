import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddExpense from "../pages/AddExpense";
import PrivateRoute from "./PrivateRoute";
import AllExpenses from "../pages/AllExpenses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-expense",
        element: (
          <PrivateRoute>
            <AddExpense />
          </PrivateRoute>
        ),
      },
      {
        path: "/expenses",
        element: (
          <PrivateRoute>
            <AllExpenses />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
