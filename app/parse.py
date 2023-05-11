import csv
import sqlite3
import database
from datetime import date as dt

db = database.Database()

with open('DOHMH_New_York_Restaurant_Inspection_Results.csv') as csvFile:
    restaurants = csv.reader(csvFile)


def makeDates(inputDate):
    dateComponents = inputDate.split("/")
    date = dt(dateComponents[2], dateComponents[0], dateComponents[1])
    iDate = dt.toordinal(date)
    sDate = date.strftime("%B %d, %Y")
    return (iDate, sDate)

def addToDict(dict, line):
    iDate, sDate = makeDates(line[8])
    dict[line[0]]=[line[0], line[1], line[2], f"{line[3]} {line[4]}", line[5], line[7], iDate, sDate, line[11], line[13], line[14], line[18], line[19]]


restDict={}

for line in restaurants:
    id = line[0]
    if id not in restDict or restDict[line[0]][6] < makeDates(line[8])[0]:
        addToDict(restDict, line)
        
for id in restDict:
    r = restDict[id] # list, r=restaurants
    db.addRestaurant(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12])    

db.close()