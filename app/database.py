import sqlite3

class Database:
    def __init__(self):
        DB_FILE = "db"

        

        self.db = sqlite3.connect(DB_FILE, check_same_thread=False)
        self.c = self.db.cursor()

    def createRestaurantTable(self):
        self.c.execute(f"DROP TABLE IF EXISTS restaurant")
        self.c.execute(
            f"CREATE TABLE restaurant ( \
                id TEXT PRIMARY KEY, \
                name TEXT, \
                borough TEXT, \
                address TEXT, \
                zipCode TEXT, \
                desc TEXT, \
                date INT, \
                violation TEXT, \
                score INT, \
                grade TEXT \
            )"
        )

    def addRestaurant(self, id, name, borough, address, zipCode, desc, date, violation, score, grade):
        self.c.execute(
            f"INSERT INTO restaurants (id, name, borough, address, zipCode, description, inspectionDate, violation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (id, name, borough, address, zipCode, desc, date, violation, score, grade)
        )
        self.commit()
        
    def commit(self) -> None:
        self.db.commit()

    def getRestaurants(self, sortType="name", order = "ASC", *filters: list) -> list:
        cond = "true" if len(filters)==0 else " AND ".join([f"{filter_[0]} = '{filter_[1]}'" for filter_ in filters])
        self.c.execute(
            f"SELECT * FROM restaurants WHERE {cond} ORDER BY {sortType} {order}"
        )
        return self.c.fetchall()


        
#     # three tables: users, orders in cart, order history
#     c.execute(
#         "CREATE TABLE IF NOT EXISTS restaurants(username TEXT PRIMARY KEY, password TEXT)")
#     # execute with relation to users table
#     c.execute(
#         "CREATE TABLE IF NOT EXISTS order_history(username TEXT PRIMARY KEY, cart, history)"
#     )

#     c.execute("CREATE TABLE IF NOT EXISTS orders(username TEXT, productName TEXT, date TEXT, quantity INT, productSKU TEXT, productPrice REAL, orderID INT PRIMARY KEY)")
#     # TODO work this out later

#     # c.execute("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, SKU TEXT, name TEXT, price REAL, description TEXT, image TEXT)")

#     db.commit()  # save changes


#     def get_users():
#         c.execute("SELECT * FROM users")
#         return c.fetchall()


#     def get_user(id):
#         c.execute("SELECT * FROM users WHERE id = ?", (id,))
#         return c.fetchone()


#     def get_user_by_username(username):
#         c.execute("SELECT * FROM users WHERE username = ?", (username,))
#         return c.fetchone()


#     def get_orders():
#         c.execute("SELECT * FROM orders")
#         return c.fetchall()


#     def get_order(id):
#         c.execute("SELECT * FROM orders WHERE id = ?", (id,))
#         return c.fetchone()


#     def get_cart(username):
#         c.execute("SELECT * FROM order_history WHERE username = ?", (username,))
#         return c.fetchall()


#     # def add_order(user_id, SKU, quantity, price, date, status, notes, user_id):
#     #     c.execute("INSERT INTO orders (user_id, SKU, quantity, price, date, status, notes, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
#     #               (user_id, SKU, quantity, price, date, status, notes, user_id))
#     #     db.commit()


#     def add_user(username, password):
#         c.execute("INSERT INTO users (username, password) VALUES (?, ?)",
#                 (username, password))
#         db.commit()


# def check_username(username):
#     c.execute("SELECT * FROM users WHERE username = ?", (username,))
#     if c.fetchone():
#         return True
#     else:
#         return False
