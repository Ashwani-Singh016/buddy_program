import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch employee data");
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const searchText = search.toLowerCase();

    return (
      emp.emp_id.toLowerCase().includes(searchText) ||
      emp.name.toLowerCase().includes(searchText) ||
      emp.email.toLowerCase().includes(searchText) ||
      emp.contact.toLowerCase().includes(searchText)
    );
  });

  const styles = {
    container: {
      width: "90%",
      margin: "40px auto",
      fontFamily: "Arial, Helvetica, sans-serif",
    },

    title: {
      textAlign: "center",
      color: "#1f3b64",
      fontSize: "40px",
      fontWeight: "bold",
      marginBottom: "20px",
    },

    searchContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "15px",
    },

    search: {
      width: "250px",
      padding: "8px 12px",
      fontSize: "15px",
      border: "1px solid #0d6efd",
      borderRadius: "5px",
      outline: "none",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
    },

    th: {
      backgroundColor: "#0d6efd",
      color: "#fff",
      padding: "15px",
      border: "1px solid #ddd",
      textAlign: "center",
      fontSize: "18px",
    },

    td: {
      padding: "15px",
      border: "1px solid #ddd",
      textAlign: "center",
      fontSize: "16px",
    },

    noData: {
      textAlign: "center",
      color: "red",
      fontWeight: "bold",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employee List</h1>

      {/* Small Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Contact</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td style={styles.td}>{emp.emp_id}</td>
                <td style={styles.td}>{emp.name}</td>
                <td style={styles.td}>{emp.email}</td>
                <td style={styles.td}>{emp.contact}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.noData} colSpan="4">
                No Employee Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;