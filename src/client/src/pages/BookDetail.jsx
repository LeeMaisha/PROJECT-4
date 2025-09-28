import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book details & reviews
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/books/${id}`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setBook(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/books/${id}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    Promise.all([fetchBook(), fetchReviews()]).finally(() => setLoading(false));
  }, [id]);

  // Borrow/Return toggle
  const handleBorrowToggle = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowed: !book.borrowed }),
      });

      if (!response.ok) throw new Error("Failed to update borrow status");

      const updated = await response.json();
      setBook(updated);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Delete book
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete book");
      navigate("/books");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      alert("Please provide both rating and review!");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/books/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      const newReview = await response.json();
      setReviews([...reviews, newReview]);
      setRating(0);
      setComment("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p className="loading">Loading book...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Status:</strong> {book.borrowed ? "Borrowed ❌" : "Available ✅"}</p>
      {book.year && <p><strong>Year:</strong> {book.year}</p>}
      {book.description && <p><strong>Description:</strong> {book.description}</p>}

      <div className="actions">
        <button onClick={handleBorrowToggle}>
          {book.borrowed ? "Return Book" : "Borrow Book"}
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete Book
        </button>
      </div>

      {/* Reviews Section */}
      <section className="reviews">
        <h3>Reviews & Ratings</h3>

        <form onSubmit={handleReviewSubmit} className="review-form">
          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value="0">Select...</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r} ⭐</option>
              ))}
            </select>
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
          />

          <button type="submit">Submit Review</button>
        </form>

        {reviews.length > 0 ? (
          <ul className="review-list">
            {reviews.map((rev) => (
              <li key={rev.id} className="review-card">
                <p><strong>{rev.rating} ⭐</strong></p>
                <p>{rev.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first!</p>
        )}
      </section>

      <Link to="/books" className="back-link">⬅ Back to Books</Link>
    </div>
  );
}

export default BookDetail;
