
import React from 'react';

function About() {
  return (
    <div className="container mt-4">
      <div className="about-header text-center">
        <h1>About Our Bookstore</h1>
        <p className="lead">Your trusted partner in literary adventures since 2024</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2>📖 Our Story</h2>
          <p>
            Founded with a passion for literature, our bookstore brings together book lovers 
            from around the world. We believe in the power of stories to transform lives and 
            connect communities.
          </p>
        </div>

        <div className="about-section">
          <h2>🎯 Our Mission</h2>
          <p>
            To make quality literature accessible to everyone, while supporting authors 
            and fostering a love for reading across all generations.
          </p>
        </div>

        <div className="about-section">
          <h2>🌟 Why Choose Us?</h2>
          <div className="features">
            <div className="feature">
              <h4>Wide Selection</h4>
              <p>Thousands of books across all genres</p>
            </div>
            <div className="feature">
              <h4>Competitive Prices</h4>
              <p>Best deals on new releases and classics</p>
            </div>
            <div className="feature">
              <h4>Fast Delivery</h4>
              <p>Quick shipping to your doorstep</p>
            </div>
            <div className="feature">
              <h4>Expert Reviews</h4>
              <p>Curated recommendations from book experts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;