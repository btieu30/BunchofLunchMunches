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
numList = numList.splice(0,3);

// problem: js cant read jinja rn, so it can't get the button by id, which controlled using jinja
var initialize = function() {
    for (let i = 0; i < numList.length; i++) {
        var num = numList[i];

        // if user clicks on dropdown
        var buttonID = "button"+num;
        console.log(buttonID);
        var buttonDrop = document.getElementById(buttonID);
        console.log(buttonDrop);

        // if button is clicked for that one result, disappear every other results
        buttonDrop.onclick = disappearAllElse;

        // if user clicks save
        // var saveID = "save"+num;
        // var save = document.getElementById(saveID);
        // var star = document.getElementById("star"+num);
        // save.addEventListener("onclick", clickSave(star))
    }

    // back to results button clicked:
    var back = document.getElementById('buttonBackResults');
    back.onclick = backToResults;
}

var disappearAllElse = function(e) {
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

    //display back to results button
    var back = document.getElementById('buttonBackResults');
    console.log(back);
    back.style.display = "inline";

    //only display the result that was clicked
    e.style.display = "inline";
}

var backToResults = function(e) {
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

        //made all the dropdowns collapsed NEEEED TO WORK ON!!!!!!!!!!!
        buttonDrop.classList.remove("show");
    }

    //disappear button
    e.style.display = "none";
}

// var clickSave = function(star) {
//     if (star.style.display==="none") {
//         star.style.display = "inline";
//     }
//     else {
//         star.style.display = "none";
//     }
//     // ****** also need to add/remove restaurant from list of saved!!!
// }

initialize();
