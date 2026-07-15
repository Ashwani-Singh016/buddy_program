import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeList.css";
import config from "../config";


function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // const response = await axios.get("http://127.0.0.1:8000/employees");
      const response = await axios.get(
  `${config.API_BASE_URL}/employees`
);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp.emp_id);
    setEditedEmployee({
      name: emp.name,
      email: emp.email,
      contact: emp.contact,
    });
  };

  const handleUpdate = async (emp_id) => {
    try {
      // await axios.put(
      //   `http://127.0.0.1:8000/employees/${emp_id}`,
      //   editedEmployee
      // );
      await axios.put(
  `${config.API_BASE_URL}/employees/${emp_id}`,
  editedEmployee
);
      setEditingId(null);
      fetchEmployees();
    } catch (error) {
      alert("Update failed");
    }
  };

  const handleDelete = async (emp_id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      // await axios.delete(`http://127.0.0.1:8000/employees/${emp_id}`);
     await axios.delete(
  `${config.API_BASE_URL}/employees/${emp_id}`
);
      fetchEmployees();
    } catch (error) {
      alert("Delete failed");
    }
  };
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

const currentEmployees = employees.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(employees.length / recordsPerPage);

const nextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

  return (
    <div className="employee-container">
      <h1 className="employee-title">Employee List</h1>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.emp_id}</td>

              <td>
                {editingId === emp.emp_id ? (
                  <input
                    className="employee-input"
                    value={editedEmployee.name}
                    onChange={(e) =>
                      setEditedEmployee({
                        ...editedEmployee,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  emp.name
                )}
              </td>

              <td>
                {editingId === emp.emp_id ? (
                  <input
                    className="employee-input"
                    value={editedEmployee.email}
                    onChange={(e) =>
                      setEditedEmployee({
                        ...editedEmployee,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  emp.email
                )}
              </td>

              <td>
                {editingId === emp.emp_id ? (
                  <input
                    className="employee-input"
                    value={editedEmployee.contact}
                    onChange={(e) =>
                      setEditedEmployee({
                        ...editedEmployee,
                        contact: e.target.value,
                      })
                    }
                  />
                ) : (
                  emp.contact
                )}
              </td>

              <td>
                {editingId === emp.emp_id ? (
                  <button
                    className="save-btn"
                    onClick={() => handleUpdate(emp.emp_id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(emp.emp_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
  <button onClick={prevPage} disabled={currentPage === 1}>
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={nextPage}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
    </div>
  );
}

export default EmployeeList;
