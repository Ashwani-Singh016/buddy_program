// src/components/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  const cards = [
    { title: "Registration", desc: "Register new employees with ID, email, name and contact.", link: "/registration", color: "primary" },
    { title: "Buddy Assign", desc: "Assign a buddy to an employee by linking their IDs.", link: "/buddy-assign", color: "success" },
    { title: "Schedule Meeting", desc: "Schedule meetings between employee, buddy and PM.", link: "/schedule-meeting", color: "warning" },
    { title: "Buddy Registration", desc: "Register new buddies in the system.", link: "/buddy-registration", color: "info" },
  ];
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">Buddy Program</h1>
        <p className="text-muted">Manage employee onboarding, buddy assignments and meetings</p>
      </div>
      <div className="row g-4">
        {cards.map((c) => (
          <div className="col-md-6" key={c.title}>
            <div className={`card border-${c.color} shadow h-100`}>
              <div className="card-body">
                <h5 className={`card-title text-${c.color}`}>{c.title}</h5>
                <p className="card-text text-muted">{c.desc}</p>
                <Link to={c.link} className={`btn btn-${c.color}`}>Go to {c.title}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;