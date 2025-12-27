import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">📚 BookStore</Link>
        
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/books">Books</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
          
          {isLoggedIn && (
            <>
              <Link className="nav-link" to="/cart">
                🛒 Cart
              </Link>
              <Link className="nav-link" to="/orders">
                📦 Orders
              </Link>
            </>
          )}
        </div>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          {isLoggedIn ? (
            <>
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: '300'
              }}>
                Welcome, {user?.username}
              </span>
              
              <button 
                onClick={logout}
                style={{
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: '300',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;