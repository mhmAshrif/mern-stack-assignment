import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;