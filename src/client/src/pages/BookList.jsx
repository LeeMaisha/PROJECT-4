import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  
  const handleBorrowToggle = async (book) => {
  try {
    const res = await fetch(`http://127.0.0.1:5000/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowed: !book.borrowed }),
    });

    if (!res.ok) throw new Error("Failed to update borrow status");

    const updated = await res.json();

    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === updated.id ? updated : b))
    );
  } catch (err) {
    alert(err.message);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete book");
      setBooks(books.filter((b) => b.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="loading">Loading books...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="book-list-page">
      <h2>All Books</h2>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>✍ {book.author}</p>
              <p>{book.genre || "N/A"}</p>
              {book.year && <p>{book.year}</p>}
              <p>
                <span
                  className={`status ${book.borrowed ? "borrowed" : "available"}`}
                >
                  {book.borrowed ? "Borrowed " : "Available "}
                </span>
              </p>

              <div className="card-actions">
                <button onClick={() => handleBorrowToggle(book)}>
                  {book.borrowed ? "Return" : "Borrow"}
                </button>
                <Link to={`/books/${book.id}`} className="details-btn">
                  View Details →
                </Link>
                <button className="delete-btn" onClick={() => handleDelete(book.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
