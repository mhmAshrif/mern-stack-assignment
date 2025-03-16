import React from 'react';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  return (
    <div className="App">
      <LoginRegister />
      <Dashboard />
      <StudentList />
      <StudentForm />
    </div>
  );
}

export default App;