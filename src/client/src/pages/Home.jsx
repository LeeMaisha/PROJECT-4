import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch a few featured books
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setFeatured(data.slice(0, 5))); // first 5 books
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to the Digital Library</h1>
        <p>
          Discover, borrow, and review your favorite books all in one place.  
          Knowledge is just a click away!
        </p>
        <div className="hero-buttons">
          <Link to="/books" className="btn primary">Browse Books</Link>
          <Link to="/add-book" className="btn secondary">Add a Book</Link>
        </div>
      </header>

      {/* Quick Search */}
      <section className="quick-search">
        <h2>🔍 Quick Search</h2>
        <input
          type="text"
          placeholder="Search books by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to={`/search?query=${searchTerm}`} className="btn search-btn">
          Search
        </Link>
      </section>

      {/* Featured Books Carousel */}
      <section className="featured">
        <h2>🌟 Featured Books</h2>
        <div className="carousel">
          {featured.length > 0 ? (
            featured.map((book) => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <Link to={`/books/${book.id}`} className="btn small">
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>Loading featured books...</p>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <p>Tip: Borrow a book today and leave a review to help others!</p>
      </footer>
    </div>
  );
}

export default Home;