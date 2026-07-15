// // src/components/Navbar.jsx
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container">
//         <Link className="navbar-brand fw-bold" to="/">
//           Buddy Program
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navMenu"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navMenu">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/registration">Registration</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/buddy-assign">Buddy Assign</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/schedule-meeting">Schedule Meeting</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/buddy-registration">Buddy Registration</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/employee-list">Employee List</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// src/components/Navbar.jsx

import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/home">
          Buddy Program
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/registration">
                Registration
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/buddy-assign">
                Buddy Assign
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/schedule-meeting">
                Schedule Meeting
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/buddy-registration">
                Buddy Registration
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/employee-list">
                Employee List
              </Link>
            </li>

            <li className="nav-item ms-3">
              <button
                className="btn btn-danger btn-sm"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
