import React, { useEffect, useState } from "react";
import BookList from "./components/BookList";
import GenreFilter from "./components/GenreFilter";

function Books() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFiltered(data);
        // Extract unique genres
        const uniqueGenres = [...new Set(data.map((b) => b.genre))];
        setGenres(uniqueGenres);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const handleBorrow = (book) => {
    const updatedBook = { ...book, borrowed: !book.borrowed };

    fetch(`http://127.0.0.1:5000/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedBooks = books.map((b) => (b.id === book.id ? data : b));
        setBooks(updatedBooks);
        setFiltered(updatedBooks);
      })
      .catch((err) => console.error("Error borrowing book:", err));
  };

  const handleGenreSelect = (genre) => {
    if (genre === "") {
      setFiltered(books);
    } else {
      setFiltered(books.filter((b) => b.genre === genre));
    }
  };

  return (
    <div className="page">
      <h2>📚 All Books</h2>
      <GenreFilter genres={genres} onSelect={handleGenreSelect} />
      <BookList books={filtered} onBorrow={handleBorrow} />
    </div>
  );
}
function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const handleBorrow = (book) => {
    const updatedBook = { ...book, borrowed: !book.borrowed };

    fetch(`http://127.0.0.1:5000/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(books.map((b) => (b.id === book.id ? data : b)));
      })
      .catch((err) => console.error("Error borrowing book:", err));
  };

  return (
    <div className="page">
      <h2>All Books</h2>
      <BookList books={books} onBorrow={handleBorrow} />
    </div>
  );
}
export default Books;
