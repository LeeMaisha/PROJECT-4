from datetime import datetime, timedelta, date
from faker import Faker
from werkzeug.security import generate_password_hash
from app import app, db  
from models import User, Book, Genre, Rating, BorrowRecord

fake = Faker()

def seed_database():
    with app.app_context():
        db.session.query(BorrowRecord).delete()
        db.session.query(Rating).delete()
        db.session.query(Book).delete()
        db.session.query(User).delete()
        db.session.query(Genre).delete()
        db.session.commit()

        genres = [
            Genre(name="Mystery"),
            Genre(name="Technology"),
            Genre(name="Philosophy"),
            Genre(name="Fantasy"),
            Genre(name="Science"),
            Genre(name="Self-Help"),
            Genre(name="Fiction"),
            Genre(name="Biography"),
        ]
        db.session.add_all(genres)
        db.session.commit()

        users = [
            User(
                name="Jane Doe", 
                email="jane.doe@gmail.com", 
                password_hash=generate_password_hash("password123"), 
                created_at=datetime.now()
            ),
            User(
                name="John Smith", 
                email="john.smith@gmail.com", 
                password_hash=generate_password_hash("password123"), 
                created_at=datetime.now()
            ),
            User(
                name="Alice Johnson", 
                email="alice.johnson@gmail.com", 
                password_hash=generate_password_hash("password123"), 
                created_at=datetime.now()
            ),
            User(
                name="Bob Brown", 
                email="bob.brown@gmail.com", 
                password_hash=generate_password_hash("password123"), 
                created_at=datetime.now()
            ),
            User(
                name="Charlie Davis", 
                email="charlie.davis@gmail.com", 
                password_hash=generate_password_hash("password123"), 
                created_at=datetime.now()
            ),
        ]
        db.session.add_all(users)
        db.session.commit()

        books = [
            Book(
                title="Think Better",
                author="Ben Carson",
                published_year=date(1982, 1, 1),  
                genre_id=6,  
                description="A motivational book encouraging readers to set high goals and achieve their dreams.",
                last_updated=datetime.now()
            ),
            Book(
                title="The Great Gatsby",
                author="F. Scott Fitzgerald",
                published_year=date(1925, 1, 1),  
                genre_id=7,  
                description="A novel about the American dream and the decadence of the Jazz Age.",
                last_updated=datetime.now()
            ),
            Book(
                title="Beauty and the Beast",
                author="Gabrielle-Suzanne Barbot de Villeneuve", 
                published_year=date(1740, 1, 1),  
                genre_id=4, 
                description="A fairy tale about beauty, love, and transformation.",
                last_updated=datetime.now()
            ),
            Book(
                title="The Catcher in the Rye",
                author="J.D. Salinger",
                published_year=date(1951, 1, 1),  
                genre_id=7,  
                description="A story about teenage rebellion and alienation.",
                last_updated=datetime.now()
            ),
            Book(
                title="Sapiens",
                author="Yuval Noah Harari",
                published_year=date(2011, 1, 1),
                genre_id=3,  
                description="A brief history of humankind and how we came to dominate the world.",
                last_updated=datetime.now()
            ),
            Book(
                title="The Hobbit",
                author="J.R.R. Tolkien",
                published_year=date(1937, 1, 1),
                genre_id=4,  
                description="A fantasy adventure about Bilbo Baggins and his unexpected journey.",
                last_updated=datetime.now()
            ),
        ]
        db.session.add_all(books)
        db.session.commit()

        print("Creating ratings...")
        ratings = [
            Rating(
                user_id=1, 
                book_id=1, 
                rating=5, 
                review="Inspiring and motivational! Changed my perspective on goal-setting.", 
                created_at=datetime.now()
            ),
            Rating(
                user_id=2, 
                book_id=2, 
                rating=4, 
                review="A classic read with deep themes about the American dream.", 
                created_at=datetime.now()
            ),
            Rating(
                user_id=3, 
                book_id=3, 
                rating=3, 
                review="A timeless fairy tale, but felt a bit dated.", 
                created_at=datetime.now()
            ),
            Rating(
                user_id=1, 
                book_id=5, 
                rating=5, 
                review="Mind-blowing insights into human history!", 
                created_at=datetime.now()
            ),
            Rating(
                user_id=4, 
                book_id=6, 
                rating=4, 
                review="Great adventure story, perfect for fantasy lovers.", 
                created_at=datetime.now()
            ),
        ]
        db.session.add_all(ratings)
        db.session.commit()

        print(" Creating borrow records...")
        borrow_records = [
            BorrowRecord(
                user_id=1,
                book_id=2,
                borrow_date=datetime.now(),
                due_date=datetime.now() + timedelta(days=14), 
            ),
            BorrowRecord(
                user_id=2,
                book_id=3,
                borrow_date=datetime.now() - timedelta(days=3),
                due_date=datetime.now() + timedelta(days=11),
            ),
            BorrowRecord(
                user_id=3,
                book_id=1,
                borrow_date=datetime.now() - timedelta(days=7),
                due_date=datetime.now() + timedelta(days=7),
            ),
           
            BorrowRecord(
                user_id=4,
                book_id=6,
                borrow_date=datetime.now() - timedelta(days=20),
                due_date=datetime.now() - timedelta(days=6),
                return_date=datetime.now() - timedelta(days=1),  
            ),
        ]
        db.session.add_all(borrow_records)
        db.session.commit()

if __name__ == "__main__":
    seed_database()