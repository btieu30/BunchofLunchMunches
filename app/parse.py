import csv
import sqlite3
import database

dB_FILE = "db"

with open('DOHMH_New_York_Restaurant_Inspection_Results.csv') as csvFile:
    restaurantFile = csv.reader(csvFile)
    restaurantList = list(restaurantFile)

for line in restaurantList:
    #addRestaurant(self, id, name, borough, address, zipCode, desc, date, violation, score, grade, lat, long)
    database.addRestaurant(database.self, line[0], line[1], line[2], f"{line[3]} {line[4]}", line[5], line[7], line[8], line[11], line[13], line[14], line[18], line[19])

database.commit(database.self)
database.c.close()