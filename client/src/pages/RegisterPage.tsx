import {  useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);

      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setMessage("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="page">
  <div className="card" style={{ maxWidth: "420px", margin: "40px auto" }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "12px" }}>
          <label>Name</label>
          <br />
          <input
           className="input" 
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Email</label>
          <br />
          <input
           className="input" 
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Password</label>
          <br />
          <input
           className="input" 
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
    
  );
};