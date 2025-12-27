import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userId', data.user.id);
        
        alert('Login successful!');
        window.location.href = '/'; // Force reload to update navbar
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{maxWidth: '400px', marginTop: '4rem'}}>
      <div style={{
        padding: '2rem',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)'
      }}>
        <h1 style={{
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          fontWeight: '300',
          fontSize: '1.5rem'
        }}>
          Login
        </h1>
        
        {error && (
          <div style={{
            color: '#dc3545',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                fontWeight: '300'
              }}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                fontWeight: '300'
              }}
            />
          </div>
          
          <button 
            type="submit"
            className="submit-btn"
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--text-primary)',
              padding: '1rem 2rem',
              fontSize: '0.9rem',
              fontWeight: '300',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginTop: '1rem'
            }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p style={{
          marginTop: '1.5rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--text-primary)'
          }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;