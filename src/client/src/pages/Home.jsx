import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [featured, setFeatured] = useState([]);

  // Fetch a few random/featured books
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/books");
        if (response.ok) {
          const data = await response.json();
          // pick max 3 random books to show
          const sample = data.sort(() => 0.5 - Math.random()).slice(0, 3);
          setFeatured(sample);
        }
      } catch (error) {
        console.error("Error fetching featured books:", error);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>📚 Welcome to the Digital Library</h1>
        <p>
          Discover, search, and borrow books all in one place. 
          Your knowledge hub starts here.
        </p>
        <Link to="/books">
          <button>Browse Books</button>
        </Link>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <h2>Quick Access</h2>
        <div className="links-grid">
          <Link to="/books" className="link-card">📖 All Books</Link>
          <Link to="/search" className="link-card">🔍 Search</Link>
          <Link to="/add-book" className="link-card">➕ Add a Book</Link>
        </div>
      </section>

      {/* Featured Books */}
      {featured.length > 0 && (
        <section className="featured">
          <h2>Featured Books</h2>
          <div className="book-list">
            {featured.map((book) => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
