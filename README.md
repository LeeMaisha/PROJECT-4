# Digital Library App

A comprehensive digital library management system that allows users to browse, borrow, and review books in a modern web interface.

##  Features

### Core Functionality
- **Browse Books** - View and search through the complete book catalog
- **Book Management** - Add new books to the library collection
- **Borrowing System** - Check out books with due date tracking
- **Review System** - Submit and read book reviews and ratings
- **Search & Filter** - Advanced search by title, author, genre

### User Experience
- **Browse & Search** - Intuitive interface for discovering books
- **Personal Library** - Track borrowed books and reading history
- **Community Reviews** - Share and read book recommendations

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)


### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/digital-library-app.git
   cd digital-library-app
   ```

2. **Install dependencies**
   ```bash
   pip install flask flask sqlalchemy bcrypt sqlalchemy-serilaizer flask-REST-FUL CORS

 


3. **Database setup**
   ```bash
   # Create database
   flask db init
   flask db upgrade head
   
   # Run migrations
   flask db migrate -m "" 
   
   # Seed initial data
    python  seed.py
   ```

4. **Environment configuration**
   ```bash
   pipenv install & pipenv shell 
   
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

##  Configuration


## Usage

### Getting Started

1. **Registration & Login**
   - Create an account with email verification
   - Login to access personalized features

2. **Browsing Books**
   - Use the search bar to find specific books
   - Filter by genre, author, availability, or publication year
   - View detailed book information including synopsis and reviews

3. **Adding Books to Collection**
   - Click "Add Book" to contribute new titles
   - Fill in book details or use ISBN lookup for automatic data
   - Upload cover images and add descriptions

4. **Borrowing Books**
   - Click "Borrow" on available books
   - View your borrowed books in "My Library"
   - Check due dates and renewal options

5. **Submitting Reviews**
   - Rate books from 1-5 stars after reading
   - Write detailed text reviews
   - View reviews from other community members

##  API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
PUT  /api/auth/profile
```

### Books Endpoints

```http
GET    /api/books              # Get all books with pagination
GET    /api/books/:id          # Get specific book details
POST   /api/books              # Add new book
PUT    /api/books/:id          # Update book information
DELETE /api/books/:id          # Delete book (owner only)
GET    /api/books/search       # Search books by query
```

### Borrowing Endpoints

```http
GET  /api/borrowing/my-books   # Get user's borrowed books
POST /api/borrowing/:bookId    # Borrow a book
PUT  /api/borrowing/:id/return # Return a book
PUT  /api/borrowing/:id/renew  # Renew borrowing period
```


### Production Build

```bash
npm create vite@latest
npm install
npm run dev




We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


### Development Guidelines

- Keep functions small and focused
- Use meaningful variable names
- Add comments for complex logic
- Ensure responsive design
- Test across different browsers


##  Acknowledgments

- Google Books API for book metadata
- Open Library for cover images
- All contributors and beta testers
- Local libraries for inspiration and requirements

---

Built with by the Digital Library Team.
