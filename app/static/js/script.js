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

var n = 3;
var disappearAllElse = function(stay) {
    for (let i = 0; i < n; i++) {
        var accordion = document.getElementById("accordion"+i);
        if (i != stay) {
            accordion.style.display="none";
        }
    }
}

// problem: js cant read jinja rn, so it can't get the button by id, which controlled using jinja
// for (let i = 0; i < n; i++) {
//     var buttonID = "button"+i;
//     var buttonDrop = document.getElementById(buttonID);
    // buttonDrop.addEventListener("click", disappearAllElse(i));
// }


