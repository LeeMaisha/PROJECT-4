# Digital Library App

A comprehensive digital library management system that allows users to browse, borrow, and review books in a modern web interface.

##  Features

### Core Functionality
- **Browse Books** - View and search through the complete book catalog
- **Book Management** - Add new books to the library collection
- **Borrowing System** - Check out books with due date tracking
- **Review System** - Submit and read book reviews and ratings
- **User Authentication** - Secure login and registration system
- **Search & Filter** - Advanced search by title, author, genre, or ISBN

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

## 🛠 Installation

### Prerequisites
- Node.js (v16.0 or higher)
- PostgreSQL (v12.0 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/digital-library-app.git
   cd digital-library-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Database setup**
   ```bash
   # Create database
   createdb digital_library
   
   # Run migrations
   npm run migrate
   
   # Seed initial data
   npm run seed
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

##  Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/digital_library
DB_HOST=localhost
DB_PORT=5432
DB_NAME=digital_library
DB_USER=your_username
DB_PASSWORD=your_password

# Server Configuration
PORT=3000
NODE_ENV=development

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email Service (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Storage
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10MB

# API Keys (if using external services)
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

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

### Reviews Endpoints

```http
GET  /api/reviews/:bookId      # Get reviews for a book
POST /api/reviews/:bookId      # Submit a review
PUT  /api/reviews/:id          # Update user's review
DELETE /api/reviews/:id        # Delete user's review
```

### Example API Request

```

## Database Schema

### Key Tables

**users**
- id, email, password_hash, first_name, last_name, created_at

**books**
- id, isbn, title, author, description, genre, publication_year, total_copies, available_copies, cover_image_url

**borrowings**
- id, user_id, book_id, borrowed_at, due_date, returned_at, renewed_count

**reviews**
- id, user_id, book_id, rating, review_text, created_at

**categories**
- id, name, description

##  Deployment

### Production Build

```bash

npm run dev 

npm start
```

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup

For production deployment:
1. Set up a PostgreSQL database
2. Configure environment variables
3. Set up SSL certificates
4. Configure reverse proxy (nginx/Apache)
5. Set up monitoring and logging


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



##  Version History

- **v2.1.0** - Added review system and advanced search
- **v2.0.0** - Complete UI overhaul and API restructure
- **v1.5.0** - Added borrowing notifications and renewals
- **v1.0.0** - Initial release with basic library functions

##  Acknowledgments

- Google Books API for book metadata
- Open Library for cover images
- All contributors and beta testers
- Local libraries for inspiration and requirements

---

Built with by the Digital Library Team.
