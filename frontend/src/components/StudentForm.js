import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ setStudents }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/students',
        { name, image, age, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data) {
        setStudents((prev) => [...prev, res.data]); // Update student list
        setName(''); 
        setImage('');
        setAge(''); // Clear age 
        setStatus('Active'); 
        setError(''); // Clear any previous errors
        setSuccess('Student added successfully!'); // Set success message
        setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Student added successfully!');
      console.error('Error adding student:', err);
    }
  };

  return (
    <div className="card shadow mb-5">
      <div className="card-body">
        <h2 className="text-center mb-4">Add Student</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;