# Clean Restaurants by Bunch of Lunch Munches

## Roster:
* Brianna Tieu (PM): Front-end (HTML, CSS, JS)
* Anthony Sun: Back-end (Database, Flask integration, parsing)
* Jeremy Kwok: Back-end (Database, Flask integration, parsing)
* Vivian Teo: Front-end (HTML, CSS, JS)

### Description
Our app, Clean Restaurants, allows users to find the best restaurants to eat at in New York City. Users can search for specific restaurants and can access each of the results, which display the restaurant's details such as address, name, grade, reviews, and past health code violations. Users can also saved their favorites restaurants and access them again via the saved page. 

### Launch Codes
1) Clone BunchofLunchMunches
```
git clone git@github.com:btieu30/BunchofLunchMunches.git
```

2) cd into BunchofLunchMunches
```
cd BunchofLunchMunches
```

2) Download the [NYC Restaurant Inspection CSV Data](https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j)
    * After clicking the link, navigate to the top right and click ```Export```
    * Select the format as ```CSV``` and your download should begin

3) Migrate the downloaded data from your Downloads to the ```app``` folder
    * Your command in the terminal may look like this.....
    ```
    mv ~/Downloads/DOHMH_New_York_City_Restaurant_Inspection_Results.csv app/
    ```

4) Create and activate your virtual environment
```
python -m venv <name of env>
source <name of env>/bin/activate
```

5) Install requirements.txt
```
pip install -r requirements.txt
```

4) Run parse.py
```
python3 app/parse.py
```

6) Run app.py
```
python3 app/app.py
```

7) Go to locally hosted Flask page: ```http://127.0.0.1:5001/``` OR navigate to https://bunch.stinkycheese.rocks/

### Data
* [New York City Restaurant Inspection Results (NYC Open Data)](https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j)
