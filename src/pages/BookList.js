import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

function BookList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
      image: `${process.env.PUBLIC_URL}/images/gatsby.jpg`
    },
    {
      id: 2,
      title: "To Kill a Mockingbird", 
      author: "Harper Lee",
      price: 14.99,
      image: `${process.env.PUBLIC_URL}/images/mockingbird.jpg`
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 10.99,
      image: `${process.env.PUBLIC_URL}/images/1984.jpg`
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 11.99,
      image: `${process.env.PUBLIC_URL}/images/pride.jpg`
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 13.99,
      image: `${process.env.PUBLIC_URL}/images/hobbit.jpg`
    },
    {
      id: 6,
      title: "Harry Potter",
      author: "J.K. Rowling",
      price: 15.99,
      image: `${process.env.PUBLIC_URL}/images/harrypotter.jpg`
    }
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (book) => {
    setCart([...cart, book]);
    alert(`Added "${book.title}" to cart!`);
  };

  const viewDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="container mt-4">
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search books or authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      <h1>Our Book Collection ({filteredBooks.length} books)</h1>
      
      <div className="book-list">
        {filteredBooks.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            onViewDetails={() => viewDetails(book.id)}
            onAddToCart={() => addToCart(book)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center">
          <p>No books found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

export default BookList;