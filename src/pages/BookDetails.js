import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const books = {
    1: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
      image: "https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=Great+Gatsby",
      description: "A classic novel of the Jazz Age, exploring themes of idealism, resistance to change, social upheaval, and excess. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion for the beautiful Daisy Buchanan.",
      genre: "Fiction, Classic",
      pages: 180,
      rating: "4.5/5",
      year: 1925
    },
    2: {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 14.99,
      image: "https://via.placeholder.com/300x400/50E3C2/FFFFFF?text=Mockingbird",
      description: "A gripping tale of racial injustice and childhood innocence in the American South. The novel is renowned for its warmth and humor, despite dealing with serious issues of rape and racial inequality.",
      genre: "Fiction, Classic",
      pages: 281,
      rating: "4.8/5",
      year: 1960
    },
    3: {
      title: "1984",
      author: "George Orwell",
      price: 10.99,
      image: "https://via.placeholder.com/300x400/9013FE/FFFFFF?text=1984",
      description: "A dystopian social science fiction novel that examines totalitarian regimes. The novel is set in the year 1984 when most of the world population have become victims of perpetual war, omnipresent government surveillance, and propaganda.",
      genre: "Science Fiction, Dystopian",
      pages: 328,
      rating: "4.6/5",
      year: 1949
    },
    4: {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 11.99,
      image: "https://via.placeholder.com/300x400/F5A623/FFFFFF?text=Pride+Prejudice",
      description: "A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.",
      genre: "Romance, Classic",
      pages: 432,
      rating: "4.7/5",
      year: 1813
    }
  };

  const book = books[id];

  if (!book) {
    return (
      <div className="container mt-4">
        <h1>Book Not Found</h1>
        <button onClick={() => navigate('/books')} className="back-btn">
          Back to Books
        </button>
      </div>
    );
  }

  const addToCart = () => {
    alert(`Added "${book.title}" to cart!`);
    // In a real app, you'd update cart state here
  };

  return (
    <div className="container mt-4">
      <button onClick={() => navigate('/books')} className="back-btn">
        ← Back to Books
      </button>
      
      <div className="book-details">
        <div className="book-detail-image">
          <img src={book.image} alt={book.title} />
        </div>
        
        <div className="book-detail-info">
          <h1>{book.title}</h1>
          <h3 className="author">by {book.author}</h3>
          
          <div className="book-meta">
            <span className="rating">⭐ {book.rating}</span>
            <span className="genre">📚 {book.genre}</span>
            <span className="pages">📖 {book.pages} pages</span>
            <span className="year">📅 {book.year}</span>
          </div>
          
          <p className="book-description">{book.description}</p>
          
          <div className="price-section">
            <div className="detail-price">${book.price}</div>
            <button className="add-to-cart" onClick={addToCart}>
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;