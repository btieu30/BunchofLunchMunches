from flask import Flask, redirect, render_template, request, session, url_for
app = Flask(__name__) 

@app.route("/")
def root():
    # return "No hablo queso!"
    return render_template('home.html', n=3)


if __name__ == "__main__":
    app.debug = True
    app.run()