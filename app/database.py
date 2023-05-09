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
                grade TEXT, \
                lat REAL, \
                long REAL \
            )"
        )

    def addRestaurant(self, id, name, borough, address, zipCode, desc, date, violation, score, grade, lat, long):
        self.c.execute(
            f"INSERT INTO restaurants (id, name, borough, address, zipCode, desc, date, violation, score, grade, lat, long) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (id, name, borough, address, zipCode, desc, date, violation, score, grade, lat, long)
        )
        self.commit()
        
    def commit(self) -> None:
        self.db.commit()

    #One filter for now
    #Two ways to sort: ASC or DSC
    def getRestaurants(self, sortType, order, *filters: list) -> list: #just make sortType = name by default and order = ASC on website
        cond = "true" if len(filters)==0 else " AND ".join([f"{filter_[0]} = '{filter_[1]}'" for filter_ in filters])
        self.c.execute(
            f"SELECT * FROM restaurants WHERE {cond} ORDER BY {sortType} {order}"
        )
        return self.c.fetchall()


    """
    def createUserTable(self):
        self.c.execute(f"DROP TABLE IF EXISTS restaurant")
        self.c.execute(
            f"CREATE TABLE user ( \
                username TEXT, \
                password TEXT, \
            )"
        )
    """

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
