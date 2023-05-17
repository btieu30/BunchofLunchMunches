from flask import Flask, redirect, render_template, request, session, url_for
from database import Database
app = Flask(__name__) 

db = Database()

@app.route("/", methods=['GET', 'POST'])
def root():
    #restaurant name, grade, review | borough | building | street | zip code |  cuisine description | inspection date | violation code | 
    #(id, name, borough, address, zipCode, desc, iDate, sDate, violation, score, grade, lat, long)
    restaurants = db.getRestaurants()
    # print(restaurants)
    n=len(restaurants)
    if (n>10):
        n = 10
    # McDonalds = ["McDonalds (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]
    # Popeyes0 = ["Popeyes (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]
    # Popeyes1 = ["Popeyes (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]
    # restaurants = [McDonalds, Popeyes0, Popeyes1]
    # n=len(restaurants)

    return render_template('home.html', restList=restaurants, n = n)

@app.route("/saved", methods=['GET', 'POST'])
def saved_page():
    # restaurant name, grade, review | borough | building | street | zip code |  cuisine description | inspection date | violation code | 
    McDonalds = ["McDonalds (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]
    Popeyes0 = ["Popeyes (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]
    Popeyes1 = ["Popeyes (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]

    restaurants = [McDonalds, Popeyes0, Popeyes1]

    return render_template('saved.html', restList=restaurants, n=len(restaurants))
    # n is the number of restaurants returned


if __name__ == "__main__":
    app.debug = True
    app.run()