from models import User, Book, Genre, Rating, BorrowRecord, db
from datetime import date

def create_sample_data():
    """Create sample data for testing"""
    if User.query.first() is not None:
        return
    
    fiction = Genre(name="Fiction")
    scifi = Genre(name="Science Fiction")
    mystery = Genre(name="Mystery")
    db.session.add_all([fiction, scifi, mystery])
    db.session.flush()  

 
    user1 = User(name="John Doe", email="john@example.com")
    user1.set_password("password123")
    
    user2 = User(name="Jane Smith", email="jane@example.com")
    user2.set_password("password123")
    
    db.session.add_all([user1, user2])
    db.session.flush()

    book1 = Book(
        title="The Great Gatsby",
        author="F. Scott Fitzgerald",
        published_year=date(1925, 4, 10),
        description="A classic novel about the American Dream",
        genre_id=fiction.id
    )
    
    book2 = Book(
        title="Dune",
        author="Frank Herbert", 
        published_year=date(1965, 8, 1),
        description="Epic science fiction novel",
        genre_id=scifi.id
    )
    
    book3 = Book(
        title="Murder on the Orient Express",
        author="Agatha Christie",
        published_year=date(1934, 1, 1),
        description="Famous mystery novel",
        genre_id=mystery.id
    )
    
    db.session.add_all([book1, book2, book3])
    db.session.commit()
    
