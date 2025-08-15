import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("login Successful");
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        {err && <p className="text-red-500 mb-3">{err}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 w-full rounded outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 w-full rounded outline-none"
            required
          />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="mt-3 text-sm text-slate-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-emerald-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
