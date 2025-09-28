import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


function BookDetail({ onBorrow }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));

    fetch(`http://127.0.0.1:5000/books/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/books/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setReviews([...reviews, newReview]);
        setRating(0);
        setComment("");
      });
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-detail-container">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Status:</strong> {book.borrowed ? "Borrowed " : "Available "}</p>
      {book.year && <p><strong>Year:</strong> {book.year}</p>}
      {book.description && <p>{book.description}</p>}

      <div className="book-detail-actions">
        <button
          className={`borrow-btn ${book.borrowed ? "borrowed" : ""}`}
          onClick={() => onBorrow(book)}
        >
          {book.borrowed ? "Return Book" : "Borrow Book"}
        </button>
        <Link to="/books" className="back-link">⬅ Back to Books</Link>
      </div>

      {/* Reviews Section */}
      <section className="reviews">
        <h3> Reviews & Ratings</h3>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value="0">Rate...</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r} ⭐</option>
            ))}
          </select>
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
          <p>No reviews yet. Be the first! </p>
        )}
      </section>
    </div>
  );
}

export default BookDetail;
