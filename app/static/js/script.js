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
numList = numList.slice(0,n);

var initialize = function() {
    // search button
    var searchButton = document.getElementById("search-button");
    if (searchButton != null) {
        document.getElementById("search-input").addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
              // Cancel the default action, if needed
              event.preventDefault();
              // Trigger the button element with a click
              displayResultsHome();
            }
          });
        searchButton.onclick = displayResultsHome;
    }

    if (document.getElementById("home")!=null) {
        // populate results
        populateResults();
        //populate filters
        populateFilter();
        //check checkbox for filter
        checkFilter();
    }
    else {
        if (saveList.length != 0) {
            displayResultsSave();
        }
    }

    // go through results dropdowns to see if user clicks on them
    for (let i = 0; i < numList.length; i++) {
        var num = numList[i];

        // if user clicks on dropdown
        var buttonID = "button"+num;
        var buttonDrop = document.getElementById(buttonID);

        // if button is clicked for that one result, disappear every other results
        if (buttonDrop!=null) {
            buttonDrop.onclick = toggle;
        }
        if (document.getElementById("home")==null) {
            buttonDrop.onclick = show;
        }

        // if user clicks save
        var saveID = "save"+num;
        var save = document.getElementById(saveID);

        if (save!=null) {
            save.onclick = clickSave;
        }

        // unsave
        var unsaveID = "unsave"+num;
        var unsave = document.getElementById(unsaveID);

        if (unsave!=null) {
            unsave.onclick = clickUnsave;
        }
    }
    var map_parameters = { center: {lat: 40.731, lng: -73.935}, zoom: 10 };
    map = new google.maps.Map(document.getElementById('map'), map_parameters);

    // google.maps.event.addDomListener(window, 'load', initialize);
}

var populateResults = function(e) {

}

var populateFilter = function() {
    console.log("running populate()........")
    var filterList = [["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
                        ["A", "B", "C", "D", "F"],
                        ["type1", "type2", "type3", "type4","type5"]];
    var dropdownList = ["borough-dropdown", "grade-dropdown", "cuisine-dropdown"];

    console.log("**************dropdownlist"+dropdownList);
    console.log(filterList.length);

    for (let i=0; i<filterList.length; i++) {
        // get dropdown
        var mainDropdown = document.getElementById(dropdownList[i]);

        for (let j=0; j<filterList[i].length; j++) {
            var newCheck = document.createElement("div");
            newCheck.className = "form-check";

            // add checklist to dropdown
            mainDropdown.appendChild(newCheck);
            console.log("***********maindropdown"+mainDropdown);
            // <div class="form-check">
            //     <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
            //     <label class="form-check-label" for="flexRadioDefault1">
            //       Default radio
            //     </label>
            //   </div>
            //   <div class="form-check">
            //     <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
            //     <label class="form-check-label" for="flexRadioDefault2">
            //       Default checked radio
            //     </label>
            //   </div>

            newCheck.setAttribute("id", filterList[i][j]);

            var newInput = document.createElement("input");
            newInput.setAttribute("class", "form-check-input");
            newInput.setAttribute("type", "radio");
            newInput.setAttribute("id", "flexRadioDefault"+(j+1)*(i+1));
            newInput.setAttribute("name", "flexRadioDefault");

            var newLabel = document.createElement("label");
            newLabel.setAttribute("class", "form-check-label");
            newLabel.setAttribute("for", "flexRadioDefault"+(j+1)*(i+1));

            newCheck.appendChild(newInput);
            newCheck.appendChild(newLabel);

            newLabel.innerHTML = filterList[i][j];
        }
    }
}
// clicking search button
var displayResultsHome = function(e) {
    // get results element (col)
    var results = document.getElementById("results");

    // get the number of dropdowns there are so we know how to splice the numList array
    var numOfDropdowns = results.getElementsByClassName("accordion").length;
    console.log("num of dropdowns/results: "+numOfDropdowns);

    // splice numList so all our other functions that use it are accurate (ex: when getting button ids: buttonOne, buttonTwo, ...)
    numList = numList.splice(0,numOfDropdowns);

    // display results
    results.style.display = "inline";
}

var displayResultsSave = function() {
    var results = document.getElementById("results");
    console.log("save list*************"+saveList);
    for (var i=0; i<n; i++) {
        var accordion = document.createElement("div");
        results.appendChild(accordion);
        accordion.setAttribute("id", "accordionPanelsStayOpenExample");
        accordion.setAttribute("class", "accordion")

        var accordionItem = document.createElement("div");
        accordion.appendChild(accordionItem);
        accordionItem.setAttribute("class", "accordion-item")
        accordionItem.setAttribute("id", "display-section-"+numList[i]);

        //preview of dropdown
        var button = document.createElement("button");
        accordionItem.appendChild(button);
        button.setAttribute("id", "button"+numList[i]);
        button.setAttribute("data-id", saveList[i][0]);
        button.setAttribute("class", "accordion-button collapsed container");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-toggle", "collapse");
        button.setAttribute("data-bs-target", "#panelStayOpen-collapse"+numList[i]);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", "panelsStayOpen-collapse"+numList[i]);

        var cont = document.createElement("div");
        button.appendChild(cont);
        cont.setAttribute("class", "container");

        var r1 = document.createElement("div");
        cont.appendChild(r1);
        r1.setAttribute("class", "row");
        var h3 = document.createElement("h3");
        r1.appendChild(h3);
        h3.setAttribute("id", "restTitle");
        h3.innerHTML = saveList[i][1];

        var r2 = document.createElement("div");
        cont.appendChild(r2);
        r2.setAttribute("class", "row");
        var h6 = document.createElement("h6");
        r2.appendChild(h6);
        h6.setAttribute("id", "restGrade");
        h6.innerHTML = "grade: "+saveList[i][10];

        var insideDropdown = document.createElement("div");
        accordionItem.appendChild(insideDropdown);
        insideDropdown.setAttribute("id", "panelsStayOpen-collapse"+numList[i]);
        insideDropdown.setAttribute("class", "accordion-collapse collapse");

        button.onclick = show;

        insideDropdown.setAttribute("aria-labelledby", "panelsStayOpen-heading"+numList[i]);

        var accordionBody = document.createElement("div");
        insideDropdown.appendChild(accordionBody);
        accordionBody.setAttribute("class", "accordion-body");

        var contCenter = document.createElement("div");
        accordionBody.appendChild(contCenter);
        contCenter.setAttribute("class", "container center");

        var card = document.createElement("div");
        contCenter.appendChild(card);
        card.setAttribute("class", "card");
        card.setAttribute("style", "width:18rem;");

        var cardBody = document.createElement("div");
        card.appendChild(cardBody);
        cardBody.setAttribute("class", "card-body");

        var h5 = document.createElement("h5");
        cardBody.appendChild(h5);
        h5.setAttribute("class", "card-title");
        h5.innerHTML = "Info";

        var p1 = document.createElement("p");
        cardBody.appendChild(p1);
        p1.setAttribute("id", "restAddress");
        p1.setAttribute("class", "card-text");
        p1.innerHTML = saveList[i][3]+", "+ saveList[i][2]+", NY "+ saveList[i][4];

        var p2 = document.createElement("p");
        cardBody.appendChild(p2);
        p2.setAttribute("id", "restCuisine");
        p2.setAttribute("class", "card-text");
        p2.innerHTML = "cuisine type: "+saveList[i][5];

        var p3 = document.createElement("p");
        cardBody.appendChild(p3);
        p3.setAttribute("id", "restInspection");
        p3.setAttribute("class", "card-text");
        p3.innerHTML = "inspection type: "+saveList[i][6];

        var p4 = document.createElement("p");
        cardBody.appendChild(p4);
        p4.setAttribute("id", "restViolation");
        p4.setAttribute("class", "card-text");
        p4.innerHTML = "violation type: "+saveList[i][8];

        var a1 = document.createElement("a");
        cardBody.appendChild(a1);
        a1.setAttribute("id", "save"+numList[i]);
        a1.setAttribute("class", "btn btn-secondary");
        a1.style.display = "none";

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        console.log(svg);
        a1.appendChild(svg);
        svg.setAttribute("id", "star"+numList[i]);
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("class", "bi bi-star");
        svg.setAttribute("viewBox", "0 0 16 16");

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg.appendChild(path);
        path.setAttribute("d", "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z");

        var a2 = document.createElement("a");
        cardBody.appendChild(a2);
        a2.setAttribute("id", "unsave"+numList[i]);
        a2.setAttribute("class", "btn btn-secondary");

        var svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        a2.appendChild(svg2);
        // svg2.setAttribute("id", "star"+numList[i]);
        svg2.setAttribute("width", "16");
        svg2.setAttribute("height", "16");
        svg2.setAttribute("fill", "currentColor");
        svg2.setAttribute("class", "bi bi-star-fill");
        svg2.setAttribute("viewBox", "0 0 16 16");

        var path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg2.appendChild(path2);
        path2.setAttribute("d", "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z");
    }
}

var show = function() {
    //toggle
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
            if (buttonDrop!=null) {
                buttonDrop.style.display= "none";
            }
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
            if (buttonDrop!=null) {
                buttonDrop.style.display= "inline";                               
                //made all the dropdowns collapsed 
                buttonDrop.setAttribute("aria-expanded", "false");
            }
        }
        clearPin();
    }
    expanded = ! expanded
    var id = "panelsStayOpen-collapse"+this.id.slice(6);
    var panel = document.getElementById(id);
    console.log(panel);
    if (panel.className === "accordion-collapse collapse") {
        panel.setAttribute("class", "accordion-collapse collapse show")
    }
    else {
        panel.setAttribute("class", "accordion-collapse collapse");
    }
}

var checkFilter = function() {
    var checkbox = document.getElementById("filterCheckbox");
    var dropdowns = document.getElementById("filterDropdowns");

    if (checkbox.checked == true) {
        dropdowns.style.display = "inline";
    }
    else {
        dropdowns.style.display = "none";
    }

    checkbox.onclick = displayFilter;
}

var displayFilter = function(e) {
    var dropdowns = document.getElementById("filterDropdowns");
    if (this.checked == true) {
        dropdowns.style.display = "inline";
    }
    else {
        dropdowns.style.display = "none";
    }
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
            if (buttonDrop!=null) {
                buttonDrop.style.display= "none";
            }
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
            if (buttonDrop!=null) {
                buttonDrop.style.display= "inline";                               
                //made all the dropdowns collapsed 
                buttonDrop.setAttribute("aria-expanded", "false");
            }
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
    var pin = new google.maps.Marker ({
        //replace with selected restaurant's lat and long
        position:{lat: 40.777, lng: -73.955},
        map: map,
        title: name,
    });
    var window = new google.maps.InfoWindow ({
        content: grade //grade
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
