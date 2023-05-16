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

// problem: js cant read jinja rn, so it can't get the button by id, which controlled using jinja
var initialize = function() {
    var numOfDropdowns = results.getElementsByClassName("accordion").length;
    console.log("num of dropdowns/results: "+numOfDropdowns);

    // splice numList so all our other functions that use it are accurate (ex: when getting button ids: buttonOne, buttonTwo, ...)
    numList = numList.splice(0,numOfDropdowns);

    for (let i = 0; i < numList.length; i++) {
        var num = numList[i];

        // if user clicks on dropdown
        var buttonID = "button"+num;
        console.log(buttonID);
        var buttonDrop = document.getElementById(buttonID);
        console.log(buttonDrop);
        //add another event for buttonDrop to create dynamic map pinning, based on what is clicked,
        //map pins should be automatically updated with info abt restaurant upon click

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

    google.maps.event.addDomListener(window, 'load', initialize);
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

    // ****** also need to add restaurant to list of saved!!!
}

var clickUnsave = function(e) {
    // disappear full star button
    this.style.display = "none";

    //appear the empty star button
    var saveID = this.id.slice(2);
    var save = document.getElementById(saveID);
    save.style.display = "inline";

    // ****** also need to remove restaurant from list of saved!!!
}

initialize();
