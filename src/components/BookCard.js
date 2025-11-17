import React from 'react';

function BookCard({ book, onViewDetails, onAddToCart }) {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
        <p className="price">${book.price}</p>
        
        <div className="card-buttons">
          <button className="view-btn" onClick={onViewDetails}>
            View Details
          </button>
          <button className="add-to-cart-btn" onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;