import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    stocks = []
    cash = float(db.execute("SELECT cash FROM users WHERE id=?", session["user_id"])[0]['cash'])
    total = cash
    data = db.execute("SELECT symbol, SUM(amount) FROM transactions GROUP BY symbol HAVING userId=?", session["user_id"])
    for row in data:
        if row['SUM(amount)'] == 0:
            break
        stock = {
            'symbol': row['symbol'],
            'amount' : row['SUM(amount)'],
            'current' : usd(lookup(row['symbol'])['price']),
            'value' : usd(row['SUM(amount)'] * lookup(row['symbol'])['price']),
        }
        stocks.append(stock)
        total += row['SUM(amount)'] * lookup(row['symbol'])['price']
    return render_template("index.html", stocks=stocks, cash=usd(cash), total=usd(total))


@app.route("/add", methods=["GET", "POST"])
@login_required
def add():
    if request.method == "POST":
        try:
            funds = float(request.form.get('funds'))
        except ValueError:
            return apology("Funds should be a positive number")
        cash = float(db.execute("SELECT cash FROM users WHERE id=?", session["user_id"])[0]['cash'])
        new_balance = cash + funds
        db.execute("UPDATE users SET cash=? WHERE id=?", (new_balance), session["user_id"])
        return redirect("/")
    return render_template("add.html")


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    if request.method == "POST":
        symbol = request.form.get('symbol')
        amount = request.form.get('shares')
        if not symbol:
            return apology("Stock required", 400)
        if not amount:
            return apology("Amount required", 400)
        try:
            amount = int(amount)
        except ValueError:
            return apology("amount should be a positive integer", 400)
        if amount < 1:
            return apology("amount should be a positive integer", 400)
        quote_price = lookup(symbol)
        if quote_price == None:
            return apology("The stock doesn't exist", 400)
        price = quote_price['price'] * amount
        cash = float(db.execute("SELECT cash FROM users WHERE id=?", session["user_id"])[0]['cash'])
        if cash < price:
            return apology("insufficient funds")
        db.execute("INSERT INTO transactions (userID, symbol, amount, cost, transaction_type, date_time) VALUES(?, ?, ?, ?, ?, datetime(?))", session["user_id"], symbol, amount, price, 'purchase', 'now')
        new_balance = cash - price
        db.execute("UPDATE users SET cash=? WHERE id=?", (new_balance), session["user_id"])
        return redirect("/")
    else:
        return render_template('buy.html')


@app.route("/history")
@login_required
def history():
    stocks = []
    data = db.execute("SELECT symbol, amount, cost, transaction_type, date_time FROM transactions WHERE userId=?", session["user_id"])
    for row in data:
        stock = {
            'symbol': row['symbol'],
            'amount' : row['amount'],
            'price' : usd(row['cost']),
            'total' : usd(row['amount'] * row['cost']),
            'type' : row['transaction_type'],
            'date_time' : row['date_time']
        }
        stocks.append(stock)
    return render_template("history.html", stocks=stocks)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    if request.method == 'POST':
        symbol = request.form.get('symbol')
        if not symbol:
            return apology("Stock rquired", 400)
        quote_price = lookup(symbol)
        if quote_price == None:
            return apology("The stock doesn't exist", 400)
        name = quote_price['name']
        price = usd(quote_price['price'])
        return render_template('quoted.html', name=name, price=price)
    else:
        return render_template('quote.html')


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        confirmation = request.form.get('confirmation')
        if not username:
            return apology("Username required", 400)
        elif not password or not confirmation:
            return apology("Password required", 400)
        elif password != confirmation:
            return apology("Passwords do not match", 400)
        check_name_exists = db.execute("SELECT * FROM users WHERE username=?", username)
        if len(check_name_exists) != 0:
            return apology("Username already taken", 400)
        db.execute("INSERT INTO users (username, hash) VALUES(?, ?)", username, generate_password_hash(password))
        return redirect("/")
    else:
        return render_template('register.html')


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    stocks = db.execute("SELECT symbol FROM transactions GROUP BY symbol HAVING userId=?", session["user_id"])
    if request.method == 'POST':
        symbol = request.form.get('symbol')
        try:
            amount = int(request.form.get('shares'))
        except ValueError:
            return apology("amount should be a positive integer")
        current_amount = int(db.execute("SELECT SUM(amount) FROM transactions WHERE symbol=? AND userID=?", symbol, session["user_id"])[0]['SUM(amount)'])
        if amount > current_amount:
            return apology("That's more stocks than you own")
        current_price = lookup(symbol)['price']
        cash = float(db.execute("SELECT cash FROM users WHERE id=?", session["user_id"])[0]['cash'])
        new_balance = cash + (current_price * amount)
        amount = amount * -1
        db.execute("UPDATE users SET cash=? WHERE id=?", (new_balance), session["user_id"])
        db.execute("INSERT INTO transactions (userID, symbol, amount, cost, transaction_type, date_time) VALUES(?, ?, ?, ?, ?, datetime(?))", session["user_id"], symbol, amount, current_price, 'sale', 'now')
        return redirect("/")
    return render_template("sell.html", stocks=stocks)
