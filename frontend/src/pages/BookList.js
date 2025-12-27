import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/books');
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      console.log('Books data:', data); // Debug: check what you get
      setBooks(data); // Simple: just use the data directly
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Error loading books. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  // SIMPLIFIED: No token needed, just user ID
  const handleAddToCart = async (bookId) => {
    try {
      const userId = localStorage.getItem('userId') || 1;
      
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          userId: parseInt(userId), 
          bookId: parseInt(bookId)
        })
      });
      
      if (response.ok) {
        alert('Added to cart successfully!');
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container">
        <h1>Our Books Collection</h1>
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Our Books Collection</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search books or authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="book-list">
        {filteredBooks.length === 0 ? (
          <p>No books found. Try a different search.</p>
        ) : (
          filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onViewDetails={handleViewDetails}
              onAddToCart={() => handleAddToCart(book.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BookList;