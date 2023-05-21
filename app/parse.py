import csv
import database
from datetime import date as dt

def makeDates(inputDate):
    dateComponents = inputDate.split("/")
    date = dt(int(dateComponents[2]), int(dateComponents[0]), int(dateComponents[1]))
    iDate = dt.toordinal(date)
    sDate = date.strftime("%B %d, %Y")
    return (int(iDate), sDate)

def addToDict(dict, line):
    iDate, sDate = makeDates(line[8])
    dict[line[0]]=[line[0], line[1], line[2], f"{line[3]} {line[4]}", line[5], line[7], iDate, sDate, line[11], line[13], line[14], line[18], line[19]]

# CAMIS,DBA,BORO,BUILDING,STREET,ZIPCODE,PHONE,CUISINE DESCRIPTION,INSPECTION DATE,ACTION,VIOLATION CODE,VIOLATION DESCRIPTION,CRITICAL FLAG,SCORE,GRADE,GRADE DATE,RECORD DATE,INSPECTION TYPE,Latitude,Longitude,Community Board,Council District,Census Tract,BIN,BBL,NTA,Location Point1
# 0     1   2    3        4      5       6     7                   8               9      10             11                    12            13    14    15         16          17              18       19        20              21               22           23  24  25  26                   

def parse():
    db = database.Database()

    csvFile = open('app/DOHMH_New_York_City_Restaurant_Inspection_Results.csv')
    restaurants = csv.reader(csvFile)
    next(restaurants) # remove header
    db.createRestaurantTable()

    restDict={}

    for line in restaurants:
        id = line[0]
        if (id not in restDict or restDict[line[0]][6] < makeDates(line[8])[0]) and line[1]!="" and line[8]!="" and makeDates(line[8])[0]>711858: #726467
            addToDict(restDict, line)
    
    for id in restDict:
        r = restDict[id] # list, r=restaurants
        r = ["N/A" if x == "" else x for x in r]
        db.addRestaurant(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12])    

    csvFile.close()
    db.close()


def parseSearchRequest(request: str):
    output=[]
    request = request.lower()
    seps = [' in ', 'of grade', 'or', 'with a grade of', 'serving', ' food', 'restaurant'] #organize seps by order (borough)
    sepMatched = False
    for sep in seps:
        if sep in request:
            sepMatched=True
            i = request.index(sep)
            begin = request[:i].strip()
            end = request[i+len(sep):].strip()
            break
    if sepMatched:
        if begin: # checks if empty
            for pair in parseSearchRequest(begin):
                output.append(pair)
        if end: # checks if empty
            for pair in parseSearchRequest(end):
                output.append(pair)
        return output
    else:
        return (matchArg(request),) #dont remove the comma
        
def matchArg(argument: str) -> list:
    argument = argument.title()
    filters= {
                "Grade": ['A', 'Z', 'B', 'C', 'N', 'P'],
                "Borough": ["Brooklyn", "Manhattan", "Queens", "Staten Island", "Bronx"],
                "Cuisine": ['Sandwiches/Salads/Mixed Buffet', 'Salads', 'Egyptian', 'Filipino', 'Seafood', 'Bakery Products/Desserts', 'New American', 'Pancakes/Waffles', 'German', 'Indonesian', 'Lebanese', 'Peruvian', 'Scandinavian', 'Hotdogs/Pretzels', 'Russian', 'Middle Eastern', 'Italian', 'Turkish', 'Caribbean', 'Greek', 'Donuts', 'Tex-Mex', 'African', 'American', 'Jewish/Kosher', 'Continental', 'Chinese/Cuban', 'Portuguese', 'Eastern European', 'Asian/Asian Fusion', 'Soups/Salads/Sandwiches', 'Bangladeshi', 'Tapas', 'Chicken', 'Basque', 'Chilean', 'Other', 'Pakistani', 'Mexican', 'Nuts/Confectionary', 'Spanish', 'Korean', 'Barbecue', 'Frozen Desserts', 'Australian', 'Soups', 'Polish', 'Sandwiches', 'Brazilian', 'Southwestern', 'Pizza', 'Southeast Asian', 'Creole', 'French', 'Fruits/Vegetables', 'Latin American', 'Ethiopian', 'Thai', 'Hotdogs', 'Creole/Cajun', 'Armenian', 'Chinese', 'Coffee/Tea', 'Vegetarian', 'Juice, Smoothies, Fruit Salads', 'Moroccan', 'Japanese', 'Hamburgers', 'Vegan', 'Irish', 'Czech', 'Fusion', 'Bottled Beverages', 'New French', 'Iranian', 'Chinese/Japanese', 'Californian', 'Steakhouse', 'English', 'Mediterranean', 'Afghan', 'Hawaiian', 'Indian', 'Soul Food', 'Cajun', 'Bagels/Pretzels']
            }
    
    for filter in filters:
        for type in filters[filter]:
            if argument in type:
                return (filter, argument)
    return ("Name", argument)
    
if __name__ == "__main__":
    # parse()
    print(parseSearchRequest("Mcdonalds in brooklyn with a grade of b"))