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

  /
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/books/${id}/reviews`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    Promise.all([fetchBook(), fetchReviews()]).finally(() => setLoading(false));
  }, [id]);

  // Borrow toggle
  const handleBorrowToggle = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowed: !book.borrowed }),
      });
      if (!res.ok) throw new Error("Failed to update borrow status");
      const updated = await res.json();
      setBook(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!window.confirm("Delete this book?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete book");
      navigate("/books");
    } catch (err) {
      alert(err.message);
    }
  };

  // Submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return alert("Fill in rating and comment!");

    try {
      const res = await fetch(`http://127.0.0.1:5000/books/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      const newReview = await res.json();
      setReviews([...reviews, newReview]);
      setRating(0);
      setComment("");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre || "N/A"}</p>
      {book.year && <p><strong>Year:</strong> {book.year}</p>}
      <p><strong>Status:</strong> {book.borrowed ? "Borrowed ❌" : "Available ✅"}</p>
      {book.description && <p><strong>Description:</strong> {book.description}</p>}

      <div className="actions">
        <button onClick={handleBorrowToggle}>
          {book.borrowed ? "Return Book" : "Borrow Book"}
        </button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>

      {/* Reviews */}
      <section className="reviews">
        <h3>Reviews</h3>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value="0">Select...</option>
              {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} ⭐</option>)}
            </select>
          </label>
          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        {reviews.length > 0 ? (
          <ul className="review-list">
            {reviews.map((r) => (
              <li key={r.id} className="review-card">
                <p><strong>{r.rating} ⭐</strong></p>
                <p>{r.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>

      <Link to="/books" className="back-link">⬅ Back to Books</Link>
    </div>
  );
}

export default BookDetail;