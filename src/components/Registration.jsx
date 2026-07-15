import { useState } from "react";
import config from "../config";

function Registration() {
  const [form, setForm] = useState({
    emp_id: "",
    name: "",
    email: "",
    contact: "",
  });

  const [response, setResponse] =useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length <= 10) {
        setForm({
          ...form,
          contact: onlyNumbers,
        });
      }
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(form.email)) {
      setResponse({
        success: false,
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (!phoneRegex.test(form.contact)) {
      setResponse({
        success: false,
        message:
          "Contact number must be exactly 10 digits and start with 6, 7, 8 or 9.",
      });
      return;
    }

    try {
      const res = await fetch(`${config.API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      setResponse(data);

      if (data.success) {
        setForm({
          emp_id: "",
          name: "",
          email: "",
          contact: "",
        });
      }
    } catch (error) {
      setResponse({
        success: false,
        message: "Backend is not connected. Run start-backend.bat first.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <h3 className="text-center text-primary mb-4">
          Employee Registration
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Employee ID */}
          <div className="mb-3">
            <label className="form-label">Employee ID</label>

            <input
              type="text"
              className="form-control"
              name="emp_id"
              value={form.emp_id}
              onChange={handleChange}
              required
            />
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label className="form-label">Contact Number</label>

            <input
              type="tel"
              className="form-control"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              maxLength={10}
              placeholder="9876543210"
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>

        {response && (
          <div
            className={`alert mt-3 ${
              response.success ? "alert-success" : "alert-danger"
            }`}
          >
            {response.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;


