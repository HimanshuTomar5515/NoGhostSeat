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
      background: "white",
      borderBottom: "1px solid #e2e8f0",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}
    >

         <Link to="/"  style={{
        fontSize: "22px",
        fontWeight: 800,
        color: "#0f172a",
        textDecoration: "none",
      }}>🎟️ NoGhostSeat</Link>
    
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Link to="/shows">Shows</Link>

      {token ? (
        <>
          <Link to="/my-bookings">My Bookings</Link>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      </div>
    </nav>
  );
};