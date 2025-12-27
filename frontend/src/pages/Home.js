import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  // CHECK LOGIN ON ENTER - MUST LOGIN TO ENTER SITE
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div>
      <div className="jumbotron">
        <h1>Welcome to Minimal Bookstore</h1>
        <p className="lead">Discover your next favorite read in our curated collection</p>
        <Link to="/books" className="btn-primary">
          Browse Books
        </Link>
      </div>
      
      <div className="container">
        <div className="about-section">
          <h2>About Our Collection</h2>
          <p>
            We specialize in carefully selected titles across various genres. 
            Each book in our collection is chosen for its literary value and 
            cultural significance.
          </p>
        </div>
        
        <div className="features">
          <div className="feature">
            <h4>Curated Selection</h4>
            <p>Handpicked books from classic to contemporary literature</p>
          </div>
          <div className="feature">
            <h4>Quality First</h4>
            <p>Focus on literary excellence and cultural significance</p>
          </div>
          <div className="feature">
            <h4>Reader Focused</h4>
            <p>Experience designed for book lovers by book lovers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;