import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
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
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Registration successful! Please login.');
        navigate('/login'); // Go to login page
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
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
          Register
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
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <p style={{
          marginTop: '1.5rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--text-primary)'
          }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;