import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="">
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="min-h-[calc(100vh-170px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
