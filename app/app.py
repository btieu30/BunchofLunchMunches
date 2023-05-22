from flask import Flask, redirect, render_template, request, session, url_for
from database import Database
app = Flask(__name__) 

db = Database()

@app.route("/", methods=['GET', 'POST'])
def root():
    #restaurant name, grade, review | borough | building | street | zip code |  cuisine description | inspection date | violation code | 
    #(id, name, borough, address, zipCode, desc, iDate, sDate, violation, score, grade, lat, long)
    restaurants = db.getRestaurants()


    return render_template('home.html', restList=restaurants)

@app.route("/saved", methods=['GET', 'POST'])
def saved_page():
    # restaurant name, grade, review | borough | building | street | zip code |  cuisine description | inspection date | violation code | 
    restaurants = db.getRestaurants()
    # n=len(restaurants)
    # if (n>10):
    #     n = 10

    McDonalds = [99345, "McDonalds", "Brooklyn", "Address", "11234", "cuisine description", "Feb 3 2023", "sDate", "31",  "score", "A"]
    Popeyes0 = [343645, "Popeyes", "Manhattan", "Address", "11342", "cuisine description", "Jan 7 2022", "sDate", "22", "score", "Z"]
    Popeyes1 = [34523, "Popeyes", "Bronx", "Address", "11242", "cuisine description", "Sept 5 2022", "sDate", "15", "score", "B"]
    restaurants = [McDonalds, Popeyes0, Popeyes1]
    n=len(restaurants)

    return render_template('saved.html', restList=restaurants, n=n)
    # n is the number of restaurants returned


if __name__ == "__main__":
    app.debug = True
    app.run(port=5001)