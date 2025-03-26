from flask import Flask, jsonify, request
from db import db_connection
import bcrypt
import jwt
import datetime
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'cheeraganesh1995@gmail.com'
app.config['MAIL_PASSWORD'] = 'arrg begf poyg alvn'
app.config['MAIL_DEFAULT_SENDER'] = 'cheeraganesh1995@gmail.com'
app.config["SECRET_KEY"] = "homeservice"

mail = Mail(app)

app.config["SECRET_KEY"] = "homeservice"
s = URLSafeTimedSerializer(app.config["SECRET_KEY"])


@app.route('/signup', methods=["POST"])
def signup():
    try:
        db = db_connection()
        if db is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = db.cursor(dictionary=True)
        data = request.json
        required_fields = ["firstName", "lastName", "email", "phoneNumber", "password"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        cursor.execute("SELECT * FROM user WHERE email=%s OR phoneNumber=%s", (data["email"], data["phoneNumber"]))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"error": "Email or phone number already registered"}), 400
        cursor.execute(
            "INSERT INTO user (firstName, lastName, email, phoneNumber, password) VALUES (%s, %s, %s, %s, %s)",
            (data["firstName"], data["lastName"], data["email"], data["phoneNumber"], hashed_password)
        )
        db.commit()
        cursor.close()
        db.close()

        return jsonify({"message": "User signed up successfully"}), 201

    except Exception as err:
        print(f" Error: {err}")
        return jsonify({"error": "Something went wrong"}), 500

@app.route('/login', methods=["POST"])
def login():
    try:
        db = db_connection()
        if db is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = db.cursor(dictionary=True)
        data = request.json
        if "email" not in data or "password" not in data:
            return jsonify({"error": "Email and password are required"}), 400
        email = data["email"]
        password = data["password"]
        cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            return jsonify({"error": "Invalid password"}), 401
        token = jwt.encode(
            {
                "user_id": user["id"],
                "userType": user["userType"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            },
            app.config["SECRET_KEY"],
            algorithm="HS256"
        )
        cursor.execute("UPDATE user SET token = %s WHERE id = %s", (token, user["id"]))
        db.commit()
        cursor.close()
        db.close()

        return jsonify({"message": "Login successful", "token": token}), 200

    except Exception as err:
        print(f"Error: {err}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/forgot-password', methods=["POST"])
def forgot_password():
    try:
        db = db_connection()
        if db is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = db.cursor(dictionary=True)
        data = request.json

        if "email" not in data:
            return jsonify({"error": "Email is required"}), 400

        email = data["email"]
        cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"}), 404
        token = s.dumps(email, salt='password-reset')
        reset_link = f"http://localhost:5173/update-password/{token}"
        msg = Message("Password Reset Request", recipients=[email])
        msg.body = f"Click the following link to reset your password: {reset_link}"

        mail.send(msg)

        cursor.close()
        db.close()

        return jsonify({"message": "Password reset link has been sent to your email."}), 200

    except Exception as err:
        print(f"Error: {err}")
        return jsonify({"error": "Something went wrong"}), 500

@app.route('/update-password/<token>', methods=["POST"])
def update_password(token):
    try:
        db = db_connection()
        if db is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = db.cursor(dictionary=True)
        data = request.json

        if "password" not in data:
            return jsonify({"error": "New password is required"}), 400
        try:
            email = s.loads(token, salt='password-reset', max_age=3600)  # Token expires in 1 hour
        except Exception as e:
            return jsonify({"error": "Invalid or expired token"}), 400
        hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        cursor.execute("UPDATE user SET password = %s WHERE email = %s", (hashed_password, email))
        db.commit()

        cursor.close()
        db.close()

        return jsonify({"message": "Password updated successfully"}), 200

    except Exception as err:
        print(f"Error: {err}")
        return jsonify({"error": "Something went wrong"}), 500


if __name__ == '__main__':
    app.run(debug=True)
