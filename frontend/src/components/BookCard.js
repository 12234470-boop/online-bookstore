import React from 'react';

function BookCard({ book, onViewDetails, onAddToCart }) {
  // ACTUAL BOOK COVER PHOTOS
  const bookCoverImages = {
    1: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490528560l/4671._SY475_.jpg', // The Great Gatsby
    2: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657._SY475_.jpg', // To Kill a Mockingbird
    3: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532714506l/40961427._SX318_.jpg', // 1984
    4: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885._SY475_.jpg', // Pride and Prejudice
    5: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546071216l/5907._SY475_.jpg', // The Hobbit
    6: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474154022l/3._SY475_.jpg'  // Harry Potter
  };

  // Placeholder images as backup
  const placeholderImages = {
    1: 'https://placehold.co/200x300/1a1a1a/ffffff?text=The+Great+Gatsby',
    2: 'https://placehold.co/200x300/1a1a1a/ffffff?text=To+Kill+a+Mockingbird',
    3: 'https://placehold.co/200x300/1a1a1a/ffffff?text=1984',
    4: 'https://placehold.co/200x300/1a1a1a/ffffff?text=Pride+%26+Prejudice',
    5: 'https://placehold.co/200x300/1a1a1a/ffffff?text=The+Hobbit',
    6: 'https://placehold.co/200x300/1a1a1a/ffffff?text=Harry+Potter'
  };

  const [currentImage, setCurrentImage] = React.useState(bookCoverImages[book.id]);

  const handleImageError = () => {
    console.log(`Book cover image failed, using placeholder for ${book.title}`);
    setCurrentImage(placeholderImages[book.id]);
  };

  return (
    <div className="book-card">
      <img 
        src={currentImage} 
        alt={`${book.title} cover`} 
        className="book-image" 
        onError={handleImageError}
      />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
        <p className="price">${book.price}</p>
        
        <div className="card-buttons">
          <button className="view-btn" onClick={() => onViewDetails(book.id)}>
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