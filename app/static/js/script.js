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

const numList = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
// numList = numList[0:3];
var disappearAllElse = function(stay) {
    for (let i = 0; i < numList.length; i++) {
        var num = numList[i];

        var accordionID = "accordion"+num;
        console.log(accordionID);

        var accordion = document.getElementById(accordionID);
        console.log(accordion);

        if (i != stay) {
            accordion.style.display="none";
        }
    }
}

var clickSave = function(star) {
    if (star.style.display==="none") {
        star.style.display = "inline";
    }
    else {
        star.style.display = "none";
    }
    // ****** also need to add/remove restaurant from list of saved!!!
}

// problem: js cant read jinja rn, so it can't get the button by id, which controlled using jinja
for (let i = 0; i < numList.length; i++) {
    var num = numList[i];

    // if user clicks on dropdown
    var buttonID = "button"+num;
    console.log(buttonID);
    var buttonDrop = document.getElementById(buttonID);
    console.log(buttonDrop);
    // buttonDrop.addEventListener("onclick", disappearAllElse(i));

    // if user clicks save
    var saveID = "save"+num;
    var save = document.getElementById(saveID);
    var star = document.getElementById("star"+num);
    save.addEventListener("onclick", clickSave(star))
}
