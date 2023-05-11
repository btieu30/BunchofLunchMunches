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

    def close(self) -> None:
        self.db.close()