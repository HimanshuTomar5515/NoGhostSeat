import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "16px",
        padding: "12px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <Link to="/shows">Shows</Link>

      {token ? (
        <>
          <Link to="/my-bookings">My Bookings</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};