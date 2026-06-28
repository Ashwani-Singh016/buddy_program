import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        onLogin();
      } else {
        setError(data.message);
      }
    } catch {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg p-4" style={{ width: 420 }}>
        <div className="text-center mb-4">
          <h2 className="text-primary fw-bold">Buddy Program</h2>
          <p className="text-muted">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              className="form-control form-control-lg"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg mt-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3 text-muted" style={{ fontSize: 13 }}>
          <strong>Demo credentials:</strong> admin / admin123
        </div>
      </div>
    </div>
  );
}

export default Login;