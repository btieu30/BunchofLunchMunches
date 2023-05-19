// Bunch of Lunch Munches
// SoftDev pd8
// ////2023
// P04

// const searchButton = document.getElementById('search-button');
// const searchInput = document.getElementById('search-input');
// searchButton.addEventListener('click', () => {
//   const inputValue = searchInput.value;
//   alert(inputValue);
// });

var numList = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
var expanded=true;
var map;
var markersArray = [];

// restList, num of results, saveList
var restList = document.getElementById("data0").innerHTML;
restList = JSON.parse(restList);

console.log(restList);
console.log(restList[0]);

var n = document.getElementById("data1").innerHTML;
var saveList = [];

var initialize = function() {
    // search button
    var searchButton = document.getElementById("search-button");
    console.log(searchButton);
    searchButton.onclick = displayResults;

    // populate results
    populateResults();
    //populate filters
    populateFilter();

    // clicking on filtering dropdowns
    var borough = document.getElementById("borough");
    borough.onclick = filter;
    var grade = document.getElementById("grade");
    grade.onclick = filter;
    var rating = document.getElementById("rating");
    rating.onclick = filter;
    var rating = document.getElementById("cuisine");
    rating.onclick = filter;

    // go through results dropdowns to see if user clicks on them
    for (let i = 0; i < numList.length; i++) {
        var num = numList[i];

        // if user clicks on dropdown
        var buttonID = "button"+num;
        var buttonDrop = document.getElementById(buttonID);

        // if button is clicked for that one result, disappear every other results
        buttonDrop.onclick = toggle;

        // if user clicks save
        var saveID = "save"+num;
        console.log(saveID);

        var save = document.getElementById(saveID);
        console.log(save);

        save.onclick = clickSave;

        // unsave
        var unsaveID = "unsave"+num;
        console.log(unsaveID);

        var unsave = document.getElementById(unsaveID);
        console.log(unsave);

        unsave.onclick = clickUnsave;
    }
    var map_parameters = { center: {lat: 40.731, lng: -73.935}, zoom: 10 };
    map = new google.maps.Map(document.getElementById('map'), map_parameters);

    // google.maps.event.addDomListener(window, 'load', initialize);
}

var populateResults = function(e) {

}

var filter = function(e) {
    var mainButton = document.getElementById("filter");
    mainButton.innerHTML = this.innerHTML;

    var insideSearchBar = document.getElementById("search-input");
    insideSearchBar.placeholder = this.innerHTML;
}

var populateFilter = function() {
    console.log("running populate()........")
    var mainDropdown = document.getElementById("filter-dropdown");
    var firstRow = document.getElementById("first-row");
    var filterList = [["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
                        ["A", "B", "C", "D", "F"],
                        ["5","4","3","2","1"],
                        ["type1", "type2", "type3", "type4","type5"]];
    // create 5 new rows
    for (let i=0; i<5; i++) {
        var newRow = document.createElement("div");
        newRow.className = "row";
        mainDropdown.appendChild(newRow);

        // populate the 4 sections (borough, grade, etc...)
        for (let j=0; j<4; j++) {

        //   <div class="form-check form-check-inline col">
        //     <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
        //     <label class="form-check-label" for="inlineCheckbox1">Borough</label>
        //   </div>

            var newCol = document.createElement("div");
            newCol.setAttribute("class", "form-check form-check-inline col");
            newCol.setAttribute("id", filterList[j][i]);
            newRow.appendChild(newCol);

            var newInput = document.createElement("input");
            newInput.setAttribute("class", "form-check-input");
            newInput.setAttribute("type", "checkbox");
            newInput.setAttribute("id", "inlineCheckbox"+(j+1)*(i+1));
            newInput.setAttribute("value", "option1");

            var newLabel = document.createElement("label");
            newLabel.setAttribute("class", "form-check-label");
            newLabel.setAttribute("for", "inlineCheckbox"+(j+1)*(i+1));

            newCol.appendChild(newInput);
            newCol.appendChild(newLabel);

            newLabel.innerHTML = filterList[j][i];
        }
    }
}
// clicking search button
var displayResults = function(e) {
    // get results element (col)
    var results = document.getElementById("results");

    // get the number of dropdowns there are so we know how to splice the numList array
    var numOfDropdowns = results.getElementsByClassName("accordion").length;
    console.log("num of dropdowns/results: "+numOfDropdowns);

    // splice numList so all our other functions that use it are accurate (ex: when getting button ids: buttonOne, buttonTwo, ...)
    numList = numList.splice(0,numOfDropdowns);

    // make main dropdown say "Filter" again
    var mainButton = document.getElementById("filter");
    mainButton.innerHTML = "Filter";

    // display results
    results.style.display = "inline";
}

var toggle = function(e) {
    if (expanded) {
        for (let i = 0; i < numList.length; i++) {
            var num = numList[i];
    
            //get id name
            var buttonID = "button"+num;
            console.log(buttonID);
    
            //fetch dropdown by id
            var buttonDrop = document.getElementById(buttonID);
            console.log(buttonDrop);
    
            //disappear every single result
            buttonDrop.style.display= "none";
            // buttonDrop.addEventListener("click", addPin());
        }
        this.style.display = "inline";
    }
    else {
        for (let i = 0; i < numList.length; i++) {
            var num = numList[i];
    
            //get id name
            var buttonID = "button"+num;
            console.log(buttonID);
    
            //fetch dropdown by id
            var buttonDrop = document.getElementById(buttonID);
            console.log(buttonDrop);
    
            //re-appear every single result
            buttonDrop.style.display= "inline";
    
            //made all the dropdowns collapsed 
            buttonDrop.setAttribute("aria-expanded", "false");
        }
        clearPin();
    }
    expanded = ! expanded
}

var clickSave = function(e) {
    // disappear the empty star button
    this.style.display = "none";

    //appear the full star button
    var  unsaveID = "un"+this.id;
    var unsave = document.getElementById(unsaveID);
    unsave.style.display = "inline";

    // add restaurant to list of saved
    var buttonDrop = document.getElementById("button"+this.id.slice(4));
    // get ID of the restaurant
    var restID = buttonDrop.getAttribute("data-id");
    var index;

    // find what index this restaurant is in restList
    for (var i=0; i<restList.length; i++){
        if (restID==restList[i][0]) {
            index = i;
        }
    }
    // add array (restaurant) to saveList
    saveList.push(restList[index]);
    console.log("**** save list: "+saveList);
}

var clickUnsave = function(e) {
    // disappear full star button
    this.style.display = "none";

    //appear the empty star button
    var saveID = this.id.slice(2);
    var save = document.getElementById(saveID);
    save.style.display = "inline";

    // remove restaurant from list of saved
    var buttonDrop = document.getElementById("button"+saveID.slice(4));
    // get ID of the restaurant
    var restID = buttonDrop.getAttribute("data-id");
    var index;

    // find what index this restaurant is in saveList
    for (var i=0; i<saveList.length; i++){
        if (restID==saveList[i][0]) {
            index = i;
        }
    }
    // remove array (restaurant) from saveList
    saveList.splice(index, 1);
    console.log("**** save list: "+saveList);
}

function addPin() {
    var name = document.getElementById("restTitle").innerHTML;
    var grade = document.getElementById("restGrade").innerHTML;
    var reviews = document.getElementById("restReviews").innerHTML;
    var pin = new google.maps.Marker ({
        //replace with selected restaurant's lat and long
        position:{lat: 40.777, lng: -73.955},
        map: map,
        title: name,
    });
    var window = new google.maps.InfoWindow ({
        content: grade, reviews //grade, reviews
      });
      markersArray.push(pin);
      //google.maps.event.addListener(pin)
    google.maps.event.addListener(pin, 'click', function() {
        console.log("HELPEPPEPEP");
        window.open(map, pin)
      });
      google.maps.event.addListener(map, 'click', function() {
        window.close()
      });
}

function clearPin() {
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}

initialize();
