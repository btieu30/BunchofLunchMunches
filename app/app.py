from flask import Flask, redirect, render_template, request, session, url_for
app = Flask(__name__) 

@app.route("/", methods=['GET', 'POST'])
def root():
    # return "No hablo queso!"
    return render_template('home.html', n=3)

@app.route("/saved", methods=['GET', 'POST'])
def saved_page():
    return render_template('saved.html', n=4) #also return the list of restaurants+info so we can display it
    # n is the number of restaurants returned


if __name__ == "__main__":
    app.debug = True
    app.run()