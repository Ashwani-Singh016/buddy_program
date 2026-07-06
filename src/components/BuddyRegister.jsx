import { useState } from "react";

function BuddyRegister() {
  const [form, setForm] = useState({ buddy_id: "", name: "", email: "" });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/buddy-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResponse(data);
    } catch {
      setResponse({ success: false, message: "Cannot connect to server. Make sure backend is running." });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: 500, margin: "auto" }}>
        <h3 className="mb-4 text-primary">Buddy Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Buddy ID</label>
            <input className="form-control" name="buddy_id" value={form.buddy_id} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register Buddy</button>
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

export default BuddyRegister;
