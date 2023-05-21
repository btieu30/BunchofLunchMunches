import sqlite3

class Database:
    def __init__(self):
        DB_FILE = "db"

        self.db = sqlite3.connect(DB_FILE, check_same_thread=False)
        self.c = self.db.cursor()

    def createRestaurantTable(self):
        self.c.execute(f"DROP TABLE IF EXISTS restaurants")
        self.c.execute(
            f"CREATE TABLE restaurants ( \
                id TEXT PRIMARY KEY, \
                name TEXT, \
                borough TEXT, \
                address TEXT, \
                zipCode TEXT, \
                desc TEXT, \
                iDate INT, \
                sDate TEXT, \
                violation TEXT, \
                score INT, \
                grade TEXT, \
                lat REAL, \
                long REAL \
            )"
        )

    def addRestaurant(self, id, name, borough, address, zipCode, desc, iDate, sDate, violation, score, grade, lat, long):
        self.c.execute(
            f"INSERT INTO restaurants (id, name, borough, address, zipCode, desc, iDate, sDate, violation, score, grade, lat, long) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (id, name, borough, address, zipCode, desc, iDate, sDate, violation, score, grade, lat, long)
        )
        self.commit()
        
    def commit(self) -> None:
        self.db.commit()

    #One sorttype for now
    #Two ways to sort: ASC or DSC
    def getRestaurants(self, sortType="name", order="ASC", filters = []) -> list: #just make sortType = name by default and order = ASC on website
        cond = "true" if len(filters)==0 else " AND ".join([f"replace({filter_[0]},\"\'\",\"\") LIKE '%{filter_[1]}%'" for filter_ in filters])
        self.c.execute(
            f"SELECT * FROM restaurants WHERE {cond} ORDER BY {sortType} {order}"
        )
        return self.c.fetchall()

    def close(self) -> None:
        self.db.close()

if __name__=="__main__":
    db = Database()
    print(db.getRestaurants("name","ASC",(("desc", "Pizza"), ("borough", "Queens"))))