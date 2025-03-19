
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm';

const Dashboard = () => {
  const [students, setStudents] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/students', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data); // Set students data
        setError(''); // Clear any previous errors
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch students');
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchStudents();
  }, [navigate]);

  // Handle loading state
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  // Handle Edit Student
  const handleEdit = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `/api/students/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents((prev) =>
        prev.map((student) =>
          student._id === id ? res.data : student
        )
      );
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  // Handle Delete Student
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Add Student Form */}
      <StudentForm setStudents={setStudents} />

      {/* Student List with Edit/Delete Actions */}
      <div className="mt-5">
        <h2 className="text-center mb-4">Student List</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>
                  {student.image && (
                    <img
                      src={student.image}
                      alt={student.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => {
                      const newName = prompt('Enter new name:', student.name);
                      const newAge = prompt('Enter new age:', student.age);
                      const newStatus = prompt('Enter new status (Active/Inactive):', student.status);
                      if (newName && newAge && newStatus) {
                        handleEdit(student._id, {
                          name: newName,
                          age: newAge,
                          status: newStatus,
                        });
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;