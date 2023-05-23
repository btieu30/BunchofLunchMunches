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

var expanded=true;
var begin = 1;
var restList;
var map;

var saveList = [];
var pins = [];
var info = [];

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        if (str[i].charAt(0).toLowerCase() == str[i].charAt(0).toUpperCase() && isNaN(str[i].charAt(0))) {
            str[i]=str[i].charAt(0)+str[i].charAt(1).toUpperCase() + str[i].slice(2);
        }
    }
    return str.join(' ');
}

var initialize = function() {
    var map_parameters = { center: {lat: 40.731, lng: -73.935}, zoom: 10 };
    map = new google.maps.Map(document.getElementById('map'), map_parameters);

    var dbList = document.getElementById("data0").innerHTML;
    dbList = JSON.parse(dbList);


    var savedIDs=getCookie("savedIDs").split(",");
    for (const id of savedIDs) {
        for (const rest of dbList) {
            if (rest[0] == id) {
                saveList.push(rest);
            }
        }
    }


    // search button
    if (document.getElementById("home")) {
        restList = dbList;

        var searchButton = document.getElementById("search-button");
        document.getElementById("search-input").addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("searchform").dispatchEvent(new Event("submit"));
        }
        });

        if (restList!="empty") {displayResults();}

        populateFilter();
        //check checkbox for filter
        checkFilter();
    }
    else {
        restList = saveList;

        if (saveList.length != 0) {
            displayResults();
        }
    }
}

var updateQuery = function() {
    var filters = document.getElementsByClassName("filterdrop");
    var seed = {};
    for (const filter of filters) {
        var labelContent = filter.querySelector("#filter").innerHTML.toLowerCase();
        var labelType = filter.children[1].id.replace("-dropdown","");
        seed[labelType]=labelContent.trim();
    }
    var s = "restaurant";
    for (let key in seed) {
        if (key != seed[key]) {
            if (key=="cuisine") {
                s = seed[key]+ " " + s;
            }
            if (key=="borough") {
                s = s+ " in " + seed[key];
            }
            if (key=="grade") {
                s = s + " with a grade of "+seed[key];
            }
            if (key=="sort" || key=="order") {
                s = s+ " (";
                var g = "";
                if (key=="sort") {
                    g = g+"sorted by "+seed[key];
                }
                if (key=="order") {
                    g = g+"in "+seed[key]+" order";
                }
                s = s + g.trim();
                s = s+ ")";
            }
        }
    }
    s=s.replace(") ("," ");
    if (s=="restaurant") {
        s=""
    }
    document.getElementById("search-input").value = s;
}


var populateFilter = function() { //FIX
    var filterList = [["Borough (deselect)", "Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
                        ['Cuisine (deselect)', 'Sandwiches/Salads/Mixed Buffet', 'Salads', 'Egyptian', 'Filipino', 'Seafood', 'Bakery Products/Desserts', 'New American', 'Pancakes/Waffles', 'German', 'Indonesian', 'Lebanese', 'Peruvian', 'Scandinavian', 'Hotdogs/Pretzels', 'Russian', 'Middle Eastern', 'Italian', 'Turkish', 'Caribbean', 'Greek', 'Donuts', 'Tex-Mex', 'African', 'American', 'Jewish/Kosher', 'Continental', 'Chinese/Cuban', 'Portuguese', 'Eastern European', 'Asian/Asian Fusion', 'Soups/Salads/Sandwiches', 'Bangladeshi', 'Tapas', 'Chicken', 'Basque', 'Chilean', 'Other', 'Pakistani', 'Mexican', 'Nuts/Confectionary', 'Spanish', 'Korean', 'Barbecue', 'Frozen Desserts', 'Australian', 'Soups', 'Polish', 'Sandwiches', 'Brazilian', 'Southwestern', 'Pizza', 'Southeast Asian', 'Creole', 'French', 'Fruits/Vegetables', 'Latin American', 'Ethiopian', 'Thai', 'Hotdogs', 'Creole/Cajun', 'Armenian', 'Chinese', 'Coffee/Tea', 'Vegetarian', 'Juice, Smoothies, Fruit Salads', 'Moroccan', 'Japanese', 'Hamburgers', 'Vegan', 'Irish', 'Czech', 'Fusion', 'Bottled Beverages', 'New French', 'Iranian', 'Chinese/Japanese', 'Californian', 'Steakhouse', 'English', 'Mediterranean', 'Afghan', 'Hawaiian', 'Indian', 'Soul Food', 'Cajun', 'Bagels/Pretzels'],
                        ["Grade (deselect)", "A", "B", "C", "D", "F"],
                        ['Sort (deselect)', 'Name', 'Grade', 'Date', 'Cuisine', 'Borough'],
                        ['Order (deselect)', 'Ascending', 'Descending']
                     ];
    var dropdownList = ["borough-dropdown", "cuisine-dropdown", "grade-dropdown" ,"sort-dropdown", "order-dropdown"];

    for (let i=0; i<dropdownList.length; i++) {
        // get dropdown
        var mainDropdown = document.getElementById(dropdownList[i]);

        for (let j=0; j<filterList[i].length; j++) {
            var newItem = document.createElement("div");
            newItem.setAttribute("class","dropdown-item");
            newItem.innerHTML = filterList[i][j];

            // add checklist to dropdown
            mainDropdown.appendChild(newItem);

            newItem.onclick = (e) => {
                e.currentTarget.parentElement.parentElement.querySelector("#filter").innerHTML = e.currentTarget.innerHTML.replace("(deselect)", "");
                updateQuery();
            }

            // newCheck.setAttribute("id", filterList[i][j]);

        }
    }
}

var displayResults = function() {
    displayResultsWithBounds(1, 5);
//    addPin(1,5);
}

var decrement = function() {
    begin=begin-5;
    displayResultsWithBounds(begin, begin+4);
}

var increment = function() {
    begin = begin+5;
    displayResultsWithBounds(begin, begin+4);
}

// clicking search button
var displayResultsWithBounds = function(start, end) {
    end = Math.min(end, restList.length);
    // get results element (col)
    var results = document.getElementById("results");
    // display results
    results.parentNode.style.display = "inline";
    results.innerHTML = "";

    var accordion = document.createElement("div");
    results.appendChild(accordion);
    accordion.setAttribute("class", "accordion");



    pageDisp.innerHTML = "Displaying "+Math.min(start, end)+"-"+end+" (of "+restList.length+" results)";

    leftarrow.removeEventListener("click",decrement);
    rightarrow.removeEventListener("click",increment);
    if (start>1) {
        leftarrow.addEventListener("click", decrement);
    }
    if (end < restList.length) {
        rightarrow.addEventListener("click", increment);
    }

    for (var i=start-1; i<end; i++) {

        var accordionItem = document.createElement("div");
        accordion.appendChild(accordionItem);
        accordionItem.setAttribute("class", "accordion-item");
        accordionItem.setAttribute("data-id", restList[i][0]);

        //preview of dropdown
        var button = document.createElement("button");
        accordionItem.appendChild(button);
        button.setAttribute("class", "accordion-button collapsed container");
        button.setAttribute("type", "button");

        var cont = document.createElement("div");
        button.appendChild(cont);
        cont.setAttribute("class", "container");

        var h3 = document.createElement("h3");
        cont.appendChild(h3);
        h3.setAttribute("class", "row");
        h3.setAttribute("id", "restTitle");
        h3.innerHTML = titleCase(restList[i][1]);

        var h6 = document.createElement("h6");
        cont.appendChild(h6);
        h3.setAttribute("class", "row");
        h6.setAttribute("id", "restGrade");
        h6.innerHTML = "Grade: "+restList[i][10];

        // var h3 = document.createElement("h3");
        // h3.setAttribute("class", "row");
        // h3.setAttribute("id", "restTitle");
        // h3.innerHTML = restList[i][1];

        // var h6 = document.createElement("h6");
        // h3.setAttribute("class", "row");
        // h6.setAttribute("id", "restGrade");
        // h6.innerHTML = "Grade: "+restList[i][5];

        // var left = document.createElement("div");
        // left.setAttribute("class","col");
        // left.setAttribute("class","container");
        // cont.appendChild(left);
        // left.append()

        var insideDropdown = document.createElement("div");
        accordionItem.appendChild(insideDropdown);
        insideDropdown.setAttribute("class", "accordion-collapse collapse");
        insideDropdown.setAttribute("id", "collapse")

        button.onclick = toggle;

        var accordionBody = document.createElement("div");
        insideDropdown.appendChild(accordionBody);
        accordionBody.setAttribute("class", "accordion-body");

        var p1 = document.createElement("p");
        accordionBody.appendChild(p1);
        p1.setAttribute("id", "restAddress");
        p1.setAttribute("class", "card-text");
        p1.innerHTML = "<b>Address:</b> " + titleCase(restList[i][3])+", "+ restList[i][2]+", NY "+ restList[i][4];

        var p2 = document.createElement("p");
        accordionBody.appendChild(p2);
        p2.setAttribute("id", "restCuisine");
        p2.setAttribute("class", "card-text");
        p2.innerHTML = "<b>Cuisine:</b> "+restList[i][5];

        var p3 = document.createElement("p");
        accordionBody.appendChild(p3);
        p3.setAttribute("id", "restInspection");
        p3.setAttribute("class", "card-text");
        p3.innerHTML = "<b>Inspection Date:</b> "+restList[i][7];

        var p4 = document.createElement("p");
        accordionBody.appendChild(p4);
        p4.setAttribute("id", "restViolation");
        p4.setAttribute("class", "card-text");
        p4.innerHTML = "<b>Violations Cited:</b> "+restList[i][8];

        var saveButtons = document.createElement("div");
        accordionBody.appendChild(saveButtons);
        saveButtons.onclick=toggleStar;

        var a1 = document.createElement("a"); // CHANGE TO DIV FIX
        saveButtons.appendChild(a1);
        // a1.setAttribute("id", "save"+numList[i]); // FIX
        a1.setAttribute("class", "btn btn-secondary"); // FIX IN PROGRESS
        a1.setAttribute("id","unsaveButton");

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        a1.appendChild(svg);
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("class", "bi bi-star");
        svg.setAttribute("viewBox", "0 0 16 16");

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg.appendChild(path);
        path.setAttribute("d", "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z");
        
        var a2 = document.createElement("a"); // CHANGE TO DIV
        saveButtons.appendChild(a2);
        a2.setAttribute("class", "btn btn-secondary"); // FIX IN PROGRESS
        a2.setAttribute("id","saveButton");
        // a2.style.display = "none"; // FIX IN PROGRESS

        var svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        a2.appendChild(svg2);
        svg2.setAttribute("width", "16");
        svg2.setAttribute("height", "16");
        svg2.setAttribute("fill", "currentColor");
        svg2.setAttribute("class", "bi bi-star-fill");
        svg2.setAttribute("viewBox", "0 0 16 16");

        var path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg2.appendChild(path2);
        path2.setAttribute("d", "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z");
    
        setStar(saveButtons);

        createPins(i, restList);
    }
    if (accordion.innerHTML == "") {
        var error = document.createElement("h3");
        error.style.textAlign="center";
        error.innerHTML = "No results were found.";
        accordion.appendChild(error);
    }
}

var createPins = function(i, restList) {
    //creating pins per result
    pins[i] = new google.maps.Marker ({
        position: {lat: restList[i][11], lng: restList[i][12]},
        map: map,
        title: restList[i][1]
    });
    pins[i].index = i;
    info[i] = new google.maps.InfoWindow ();
    info[i].setContent ('<h6>' + restList[i][1] + '</h6> Grade: ' + restList[i][10]);
    //zoom in when a specific pin is clicked and open info window
    google.maps.event.addListener (pins[i], 'click', function(){
        info[this.index].open(map,pins[this.index]);
        map.panTo(pins[this.index].getPosition());
        map.setZoom(15);
    });
    //zoom out when the window is closed
    google.maps.event.addListener (info[i], 'closeclick', function() {
        map.setZoom(10);
    });
}

var showPins = function() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

var hidePins = function() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

var deletePins = function() {
    pins = [];
    info = [];
}

var toggle = function(e) {
    var buttons = document.getElementsByClassName("accordion-button");
    var interior = this.parentNode.querySelector("#collapse");

    if (expanded) {
        for (var button of buttons) {
            button.style.display="none";
        }
        this.style.display="flex";
        interior.setAttribute("class", "accordion-collapse show");
    }
    else {
        for (var button of buttons) {
            if (button) {
                button.style.display= "flex";                               
                button.setAttribute("aria-expanded", "false");
            }
        }
        interior.setAttribute("class", "accordion-collapse collapse");

        // clearPin();
    }
    expanded = ! expanded;
}

var checkFilter = function() {
    var checkbox = document.getElementById("filterCheckbox");
    var dropdowns = document.getElementById("filterDropdowns");

    if (checkbox.checked) {
        dropdowns.style.display = "inline";
    }
    else {
        dropdowns.style.display = "none";
    }

    checkbox.onclick = displayFilter;
}

var displayFilter = function(e) {
    var dropdowns = document.getElementById("filterDropdowns");
    if (this.checked) {
        dropdowns.style.display = "inline";
    }
    else {
        dropdowns.style.display = "none";
    }
}

var setStar = function(element) {
    var restID = element.parentNode.parentNode.parentNode.getAttribute("data-id");
    var saveButton = element.querySelector("#saveButton");
    var unsaveButton = element.querySelector("#unsaveButton");

    var restData = [];
    for (const rest of restList) {
        if (rest[0] == restID) {
            restData=rest;
        }
    }
    if (saveList.includes(restData)) {
        saveButton.style.display="inline";
        unsaveButton.style.display="none";
    }
    else {
        saveButton.style.display="none";
        unsaveButton.style.display="inline";
    }
}

var toggleStar = function() {
    var restID = this.parentNode.parentNode.parentNode.getAttribute("data-id");
    var restData = [];
    for (const rest of restList) {
        if (rest[0] == restID) {
            restData=rest;
        }
    }

    var index = saveList.indexOf(restData);
    if (index == -1) {
        saveList.push(restData);
    }
    else {
        saveList.splice(index,1);
    }
    var savedIDs = [];
    for (const save of saveList) {
        savedIDs.push(save[0]);
    }
    setCookie("savedIDs", savedIDs, 7);
    setStar(this);
}

initialize();