from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
import json
from models import db

from models import User, Book, Genre, Rating, BorrowRecord


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)

migrate = Migrate(app, db)


@app.route('/')
def home():
    """Home page with API information"""
    return jsonify({
        "message": "Library Management API is running!",
        "endpoints": {
            "home": "GET /",
            "users": "GET /users",
            "books": "GET /books",
            "genres": "GET /genres",
            "create_rating": "POST /ratings",
            "get_ratings": "GET /ratings",
            "get_rating": "GET /ratings/<id>",
            "create_borrow": "POST /borrow",
            "get_borrows": "GET /borrow",
            "get_reviews": "GET /reviews",
            "create_review": "POST /reviews"
        },
        "status": "success"
    })

@app.route('/users', methods=['GET'])
def get_users():
    """Get all users"""
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get specific user"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict())

@app.route('/books', methods=['GET'])
def get_books():
    """Get all books"""
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    """Get specific book"""
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book.to_dict())

@app.route('/genres', methods=['GET'])
def get_genres():
    """Get all genres"""
    genres = Genre.query.all()
    return jsonify([genre.to_dict() for genre in genres])

@app.route('/ratings', methods=['GET'])
def get_all_ratings():
    """Get all ratings"""
    ratings = Rating.query.all()
    return jsonify([rating.to_dict() for rating in ratings])

@app.route('/ratings/<int:rating_id>', methods=['GET'])
def get_rating(rating_id):
    """Get specific rating"""
    rating = Rating.query.get(rating_id)
    if not rating:
        return jsonify({"error": "Rating not found"}), 404
    return jsonify(rating.to_dict())

@app.route('/ratings', methods=['POST'])
def create_rating():
    """Create a new rating"""
    try:
        data = request.get_json()
        
        print("Received data:", data)
        
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        # Check required fields
        required_fields = ['user_id', 'book_id', 'rating']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
        

        user = User.query.get(data['user_id'])
        if not user:
            return jsonify({"error": "User not found"}), 404

        book = Book.query.get(data['book_id'])
        if not book:
            return jsonify({"error": "Book not found"}), 404
        
        if not 1 <= data['rating'] <= 5:
            return jsonify({"error": "Rating must be between 1 and 5"}), 400
        
        existing_rating = Rating.query.filter_by(
            user_id=data['user_id'], 
            book_id=data['book_id']
        ).first()
        
        if existing_rating:
            return jsonify({"error": "User has already rated this book"}), 400
    
        rating = Rating(
            user_id=data['user_id'],
            book_id=data['book_id'],
            rating=data['rating'],
            review=data.get('review', ''),
            created_at=datetime.utcnow()
        )
        
        db.session.add(rating)
        db.session.commit()
        
        print("Rating created successfully!")
        return jsonify({
            "message": "Rating created successfully!",
            "rating": rating.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print( "Error:", str(e))
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/borrow', methods=['GET'])
def get_borrow_records():
    """Get all borrow records"""
    borrows = BorrowRecord.query.all()
    return jsonify([borrow.to_dict() for borrow in borrows]), 200


@app.route('/borrow', methods=['POST'])
def create_borrow_record():
    """Create a new borrow record"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        required_fields = ['user_id', 'book_id', 'due_date']
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        user = User.query.get(data['user_id'])
        book = Book.query.get(data['book_id'])

        if not user:
            return jsonify({"error": "User not found"}), 404
        if not book:
            return jsonify({"error": "Book not found"}), 404

       
        if BorrowRecord.query.filter_by(book_id=book.id, returned=False).first():
            return jsonify({"error": "Book is already borrowed"}), 400

        borrow = BorrowRecord(
            user_id=data['user_id'],
            book_id=data['book_id'],
            due_date=datetime.fromisoformat(data['due_date']),
            borrow_date=datetime.utcnow(),
            returned=False
        )

        db.session.add(borrow)
        db.session.commit()

        return jsonify({
            "message": "Borrow record created successfully!",
            "borrow": borrow.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Server error: {str(e)}"}), 500



@app.route('/borrow/<int:id>', methods=['GET,PATCH,DELETE,PUT'])
def update_borrow_record(id):
    """Update a borrow record (mark returned or extend due date)"""
    borrow = BorrowRecord.query.get(id)
    if not borrow:
        return jsonify({"error": "Borrow record not found"}), 404

    data = request.get_json()

    try:
        if "returned" in data:
            borrow.returned = data["returned"]
            if borrow.returned:
                borrow.return_date = datetime.utcnow()

        if "due_date" in data:
            borrow.due_date = datetime.fromisoformat(data["due_date"])

        db.session.commit()
        return jsonify(borrow.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to update borrow record: {str(e)}"}), 500


#
@app.route('/borrow/<int:id>', methods=['DELETE'])
def delete_borrow_record(id):
    """Delete a borrow record"""
    borrow = BorrowRecord.query.get(id)
    if not borrow:
        return jsonify({"error": "Borrow record not found"}), 404

    try:
        db.session.delete(borrow)
        db.session.commit()
        return jsonify({"message": "Borrow record deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to delete borrow record: {str(e)}"}), 500
    
@app.route("/reviews/<int:book_id>", methods=["GET"])
def get_reviews(book_id):
    if book_id in [1,2,3,4,5,6,7,8,9,10]:
        return jsonify([
            {"id": 1, "comment": "Great book!", "rating": 5},
            {"id": 2, "comment": "Loved it.", "rating": 5},
            {"id": 3, "comment": "Not my type.", "rating": 2},
            {"id": 4, "comment": "Interesting read.", "rating": 4},
            {"id": 5, "comment": "Could be better.", "rating": 3},
            {"id": 6, "comment": "Fantastic!", "rating": 5},
            {"id": 7, "comment": "Boring.", "rating": 1},
            {"id": 8, "comment": "Well written.", "rating": 4},
            {"id": 9, "comment": "Enjoyed every page.", "rating": 5},
            {"id": 10, "comment": "Would not recommend.", "rating": 2}
        ])
    else:
        return jsonify([]), 404


@app.route('/books', methods=['GET', 'POST'])
def handle_books():
    if request.method == 'GET':
        books = Book.query.all()
        return jsonify([book.to_dict() for book in books])
    
    elif request.method == 'POST':
        try:
            data = request.get_json()
            print("Received book data:", data)  
            
            if not data:
                return jsonify({"error": "No JSON data provided"}), 400
            
            if not data.get('title') or not data.get('author'):
                return jsonify({"error": "Title and author are required"}), 400
            
            # Create new book
            book = Book(
                title=data['title'],
                author=data['author'],
                published_year=data.get('published_year'),
                genre_id=data.get('genres_id'),
                description=data.get('description', '')
            )
            
            db.session.add(book)
            db.session.commit()
            
            return jsonify({
                "message": "Book created successfully!",
                "book": book.to_dict()
            }), 201
            
        except Exception as e:
            db.session.rollback()
            print("Error creating book:", str(e))
            return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    print("   GET  /users - Get all users")

    app.run(debug=True, host='0.0.0.0', port=5000)