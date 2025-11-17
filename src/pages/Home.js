import React from 'react';

function Home() {
  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">📚 Welcome to Our Bookstore!</h1>
        <p className="lead">Discover thousands of books across all genres.</p>
        <a className="btn btn-primary btn-lg" href="/books">Browse Books</a>
      </div>
    </div>
  );
}

export default Home;