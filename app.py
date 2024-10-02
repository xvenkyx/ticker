import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Connect to database (e.g., PostgreSQL)
db = psycopg2.connect(
    host="localhost",
    database="sell_scale",
    user="postgres",
    password="root"
)

# Create a cursor object
cursor = db.cursor()

# Create a table in the database
cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        ticker VARCHAR(10) NOT NULL,
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
""")

# Commit the changes
db.commit()

# Close the cursor
cursor.close()

@app.route('/query', methods=['GET'])
def query_stock():
    ticker = request.args.get('ticker')
    stock_info = yf.Ticker(ticker).info
    return jsonify(stock_info)

@app.route('/buy', methods=['POST'])
def buy_stock():
    data = request.json
    ticker = data['ticker']
    quantity = data['quantity']
    user_id = data['user_id']
    # Save transaction to database
    cursor = db.cursor()
    cursor.execute("INSERT INTO transactions (user_id, ticker, quantity) VALUES (%s, %s, %s)", (user_id, ticker, quantity))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Stock bought successfully'})

@app.route('/sell', methods=['POST'])
def sell_stock():
    data = request.json
    ticker = data['ticker']
    quantity = data['quantity']
    user_id = data['user_id']
    # Save transaction to database
    cursor = db.cursor()
    cursor.execute("INSERT INTO transactions (user_id, ticker, quantity) VALUES (%s, %s, %s)", (user_id, ticker, quantity))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Stock sold successfully'})

@app.route('/portfolio', methods=['GET'])
def view_portfolio():
    user_id = request.args.get('user_id')
    # Retrieve transactions from database
    cursor = db.cursor()
    cursor.execute("SELECT * FROM transactions WHERE user_id = %s", (user_id,))
    transactions = cursor.fetchall()
    portfolio = []
    for transaction in transactions:
        portfolio.append({'ticker': transaction[1], 'quantity': transaction[2]})
    cursor.close()
    return jsonify(portfolio)

if __name__ == '__main__':
    app.run(debug=True)