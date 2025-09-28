import React, { useEffect, useState } from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import SearchBox from "./components/SearchBox";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/books");
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleAddBook = (newBook) => {
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      const updated = books.filter((book) => book.id !== id);
      setBooks(updated);
      setFilteredBooks(updated);
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book. Please try again.");
    }
  };

  if (loading) {
    return <div className="container">Loading books...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <h1>Digital Library</h1>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Digital Library</h1>
      <SearchBox onSearch={handleSearch} />
      <AddBook onAdd={handleAddBook} existingBooks={filteredBooks} />
      <BookList books={filteredBooks} onDelete={handleDeleteBook} />
    </div>
  );
}

export default App;