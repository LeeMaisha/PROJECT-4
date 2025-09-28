import React, { useState } from 'react';

const AddBook = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && year) {
      onAdd({ 
        title, 
        author, 
        published_year: year, 
        description,
        id: Date.now() 
      });
      setTitle('');
      setAuthor('');
      setYear('');
      setDescription('');
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Published Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
