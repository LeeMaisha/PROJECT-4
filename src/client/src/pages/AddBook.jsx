import React, { useState } from "react";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = { title, author, description };

    try {
      const res = await fetch("http://127.0.0.1:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) throw new Error("Failed to add book");

      alert("Book added successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Error adding book");
    }
  };

  return (
    <div className="container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author:</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
