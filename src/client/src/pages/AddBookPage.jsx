import React, { useState } from "react";
import AddBook from "./components/AddBook";

function AddBookPage() {
  const [books, setBooks] = useState([]);

  const handleAdd = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className="page">
      <h2>Add a New Book</h2>
      <AddBook onAdd={handleAdd} existingBooks={books} />
    </div>
  );
}

export default AddBookPage;
