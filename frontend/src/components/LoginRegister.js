import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Success message state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await axios.post(url, { username, password });

      if (res.data) {
        if (isLogin) {
          // Login success
          localStorage.setItem('token', res.data.token); // Save token
          navigate('/dashboard'); // Redirect to Dashboard
        } else {
          // Registration success
          setSuccess('Successfully Registered!'); // Set success message
          setError(''); // Clear any previous errors
          setUsername(''); // Clear username field
          setPassword(''); // Clear password field
          setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
        }
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      // Handle duplicate username error
      if (err.response?.data?.error?.includes('E11000')) {
        setError('Username already registered');
      } else {
        setError(err.response?.data?.error || 'Something went wrong');
      }
      console.error('Error:', err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h1 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          className="btn btn-link w-100 mt-3"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;