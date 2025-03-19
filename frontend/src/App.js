import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Login/Register</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/students">Student List</Link>
          </li>
          <li>
            <Link to="/add-student">Add Student</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-student" element={<StudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;   