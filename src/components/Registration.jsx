// src/components/Registration.jsx
import { useState } from "react";

function Registration() {
  const [form, setForm] = useState({ emp_id: "", name: "", email: "", contact: "" });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: 500, margin: "auto" }}>
        <h3 className="mb-4 text-primary">Employee Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input className="form-control" name="emp_id" value={form.emp_id} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input className="form-control" name="contact" value={form.contact} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        {response && (
          <div className={`alert mt-3 ${response.success ? "alert-success" : "alert-danger"}`}>
            <strong>Success: {String(response.success)}</strong> — {response.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;