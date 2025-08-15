import { useState } from "react";
import { Link, NavLink } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import useAuth from "../hooks/useAuth";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Add Expense", href: "/add-expense" },
  { label: "All Expenses", href: "/expenses" },
  { label: "Statistics", href: "/stats" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const linkClass = ({ isActive }) =>
    `text-sm md:text-base px-3 py-2 rounded transition ${
      isActive
        ? "bg-white text-teal-700 font-semibold"
        : "hover:bg-white hover:text-teal-700"
    }`;

  return (
    <div className="bg-teal-700 text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto p-2 flex justify-between items-center">
        {/* name */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="h-3 w-3 rounded-full bg-emerald-400 inline-block" />
          Expense Tracker
        </Link>

        {/* large device links */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-4">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* login/logout */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm opacity-90">
                {user.name || user.email}
              </span>
              <button
                onClick={logout}
                className="px-3 py-2 rounded bg-white text-teal-700 hover:bg-teal-50 transition text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>

        {/* Close/open */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              <IoMdClose size={24} className="cursor-pointer" />
            ) : (
              <GiHamburgerMenu size={24} className="cursor-pointer" />
            )}
          </button>
        </div>
      </nav>

      {/* small devices menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/20 bg-teal-700/95 text-white">
          <div className="px-4 py-3 space-y-1">
            {user && (
              <div className="px-3 py-2 text-sm opacity-90">
                Signed in as{" "}
                <span className="font-medium">{user.name || user.email}</span>
              </div>
            )}

            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `block rounded px-3 py-2 text-base transition ${
                    isActive
                      ? "bg-white text-teal-700 font-semibold"
                      : "hover:bg-white/10"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-2">
              {user ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left rounded px-3 py-2 bg-white text-teal-700 hover:bg-teal-50 transition"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="block rounded px-3 py-2 hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
