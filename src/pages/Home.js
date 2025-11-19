import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">📚 Welcome to Our Bookstore!</h1>
        <p className="lead">Discover thousands of books across all genres.</p>
       <Link className="btn-primary" to="/books">Browse Books</Link>
      </div>
    </div>
  );
}

export default Home;