// src/components/ScheduleMeeting.jsx
import { useState } from "react";

function ScheduleMeeting() {
  const [form, setForm] = useState({
    emp_name: "", buddy_name: "", project_manager: "", meeting_date: "", meeting_time: ""
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/schedule-meeting", {
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
        <h3 className="mb-4 text-primary">Schedule Meeting</h3>
        <form onSubmit={handleSubmit}>
          {[["emp_name","Employee Name"],["buddy_name","Buddy Name"],["project_manager","Project Manager"]].map(([name, label]) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}</label>
              <input className="form-control" name={name} value={form[name]} onChange={handleChange} required />
            </div>
          ))}
          <div className="mb-3">
            <label className="form-label">Meeting Date</label>
            <input className="form-control" type="date" name="meeting_date" value={form.meeting_date} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Meeting Time</label>
            <input className="form-control" type="time" name="meeting_time" value={form.meeting_time} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-warning w-100 text-white">Schedule Meeting</button>
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

export default ScheduleMeeting;