from flask import Flask, redirect, render_template, request, session, url_for
from database import Database
app = Flask(__name__) 

db = Database()

@app.route("/", methods=['GET', 'POST'])
def root():
    # restaurant name, grade, review | borough | building | street | zip code |  cuisine description | inspection date | violation code | 
    # (id, name, borough, address, zipCode, desc, iDate, sDate, violation, score, grade, lat, long)
    restaurants = db.getRestaurants()
    return render_template('home.html', restList=restaurants, n=len(restaurants))

@app.route("/saved", methods=['GET', 'POST'])
def saved_page():
    # restaurant name, grade, review

    return render_template('saved.html', n=4) #also return the list of restaurants+info so we can display it
    # n is the number of restaurants returned


if __name__ == "__main__":
    app.debug = True
    app.run()