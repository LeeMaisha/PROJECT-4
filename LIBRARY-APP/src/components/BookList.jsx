import React from 'react';

const BookList = ({ books, onDelete }) => {
  if (!books || books.length === 0) {
    return (
      <div>
        <h2>Book List</h2>
        <p>No books available. Add some books to get started!</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Book List ({books.length} books)</h2>
      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Published: {book.published_year}</p>
          {book.description && <p>Description: {book.description}</p>}
          <button onClick={() => onDelete(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
