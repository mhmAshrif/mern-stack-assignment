import React from 'react';

const StudentList = () => {
  const students = [
    { id: 1, name: 'John Doe', age: 20, status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 22, status: 'Inactive' },
  ];

  return (
    <div className="container mt-5">
      <h2>Student List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
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