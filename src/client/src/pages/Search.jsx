import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Search() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("az");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => setError(err.message));
  }, []);

  const filteredBooks = books
    .filter((book) => {
      if (!query.trim()) return true;
      const search = query.toLowerCase();
      return (
        (filter === "all" || filter === "title") &&
          book.title.toLowerCase().includes(search) ||
        (filter === "all" || filter === "author") &&
          book.author.toLowerCase().includes(search) ||
        (filter === "all" || filter === "genre") &&
          book.genre?.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      if (sort === "newest") return (b.year || 0) - (a.year || 0);
      return 0;
    });

  return (
    <div className="search-page">
      <h2>Search Books</h2>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="title">Title Only</option>
          <option value="author">Author Only</option>
          <option value="genre">Genre Only</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="az">Sort A → Z</option>
          <option value="za">Sort Z → A</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      <ul className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>✍ {book.author}</p>
              <p>{book.genre || "Unknown"}</p>
              {book.year && <p>{book.year}</p>}
              <Link to={`/books/${book.id}`} className="details-btn">
                View Details →
              </Link>
            </li>
          ))
        ) : (
          <p>No books match your search.</p>
        )}
      </ul>
    </div>
  );
}

export default Search;