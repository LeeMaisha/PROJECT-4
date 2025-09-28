import React, { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import BookList from "./components/BookList";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  useEffect(() => {
    setFiltered(
      books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, books]);

  return (
    <div className="page">
      <h2>🔎 Search Books</h2>
      <SearchBox onSearch={setQuery} />
      <BookList books={filtered} />
    </div>
  );
}

export default SearchPage;