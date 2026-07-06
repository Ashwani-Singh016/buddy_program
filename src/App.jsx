import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Registration from "./components/Registration";
import BuddyAssign from "./components/BuddyAssign";
import ScheduleMeeting from "./components/ScheduleMeeting";
import BuddyRegister from "./components/BuddyRegister";
import AllData from "./components/AllData";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/home" />
              : <Login onLogin={() => setIsLoggedIn(true)} />
          }
        />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/registration" element={isLoggedIn ? <Registration /> : <Navigate to="/" />} />
        <Route path="/buddy-assign" element={isLoggedIn ? <BuddyAssign /> : <Navigate to="/" />} />
        <Route path="/schedule-meeting" element={isLoggedIn ? <ScheduleMeeting /> : <Navigate to="/" />} />
        <Route path="/buddy-registration" element={isLoggedIn ? <BuddyRegister /> : <Navigate to="/" />} />
        <Route path="/all-data" element={isLoggedIn ? <AllData /> : <Navigate to="/" />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;