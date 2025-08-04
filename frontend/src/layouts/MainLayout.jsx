import { Waves, User } from "lucide-react";
import Footer from "@/components/Footer";
import { Link, useNavigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful!");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed. Please try again later.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg bg-light py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            to="/dashboard"
            className="navbar-brand d-flex align-items-center gap-2 fw-medium fs-4 text-dark text-decoration-none"
          >
            <Waves size="24" color="#f30920" />
            Task
          </Link>

          <div className="d-flex align-items-center gap-3">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <User size={20} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end mt-2 shadow-sm">
                {user ? (
                  <>
                    <li className="dropdown-item text-muted">
                      {user.username}
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/auth/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="container my-4 flex-grow-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
