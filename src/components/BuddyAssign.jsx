// src/components/BuddyAssign.jsx
import { useState } from "react";

function BuddyAssign() {
  const [form, setForm] = useState({ emp_id: "", emp_name: "", buddy_id: "", buddy_name: "" });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/assign-buddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setResponse({ success: false, message: "Backend is not connected. Run start-backend.bat first." });
        return;
      }
      const data = await res.json();
      setResponse(data);
    } catch {
      setResponse({ success: false, message: "Backend is not connected. Run start-backend.bat first." });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: 500, margin: "auto" }}>
        <h3 className="mb-4 text-primary">Buddy Assignment</h3>
        <form onSubmit={handleSubmit}>
          {[["emp_id","Employee ID"],["emp_name","Employee Name"],["buddy_id","Buddy ID"],["buddy_name","Buddy Name"]].map(([name, label]) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}</label>
              <input className="form-control" name={name} value={form[name]} onChange={handleChange} required />
            </div>
          ))}
          <button type="submit" className="btn btn-success w-100">Assign Buddy</button>
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

export default BuddyAssign;