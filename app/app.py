from flask import Flask, redirect, render_template, request, session, url_for
app = Flask(__name__) 

@app.route("/", methods=['GET', 'POST'])
def root():
    # restaurant name, grade, review | borough | building | street | zip code |  cuisine description | inspection date | violation code | 
    McDonalds = ["McDonalds (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]
    Popeyes0 = ["Popeyes (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]
    Popeyes1 = ["Popeyes (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]
    Popeyes2 = ["Popeyes (DBA)", "A", "5.0", "borough", "building", "street", "zip code", "cuisine description", "inspection date", "violation code",]

    restList = [McDonalds, Popeyes0, Popeyes1, Popeyes2]

    return render_template('home.html', restList=restList, n=len(restList))

@app.route("/saved", methods=['GET', 'POST'])
def saved_page():
    # restaurant name, grade, review

    return render_template('saved.html', n=4) #also return the list of restaurants+info so we can display it
    # n is the number of restaurants returned


if __name__ == "__main__":
    app.debug = True
    app.run()