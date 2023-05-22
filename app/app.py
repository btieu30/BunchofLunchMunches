from flask import Flask, redirect, render_template, request, session, url_for
from database import Database
from parse import parseSearchRequest
app = Flask(__name__) 

db = Database()

@app.route("/", methods=['GET', 'POST'])
def root():
    #restaurant name, grade, review | borough | building | street | zip code |  cuisine description | inspection date | violation code | 
    #(id, name, borough, address, zipCode, desc, iDate, sDate, violation, score, grade, lat, long)
    restaurants = "empty"
    if request.method == "POST":
        restaurants=db.getRestaurants("name", "ASC", parseSearchRequest(request.form['query']))
        print("yeahaahhahah")

    return render_template('home.html', restList=restaurants)

@app.route("/saved", methods=['GET', 'POST'])
def saved_page():
    # restaurant name, grade, review | borough | building | street | zip code |  cuisine description | inspection date | violation code | 
    restaurants = db.getRestaurants()


    return render_template('saved.html', restList=restaurants)


if __name__ == "__main__":
    app.debug = True
    app.run(port=5001)