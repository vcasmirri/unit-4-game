$(document).ready(function() {

// Starting values
var winCount = 0;
var lossCount = 0;
$("#wins").text("Wins: " + winCount);
$("#losses").text("Losses: " + lossCount);

// Variables to check if crystal values are unique
var unique = [];
var isUnique = false;

// Variable for function that checks if game is winnable
var canWin = true;

// Stores image sources for crystals
var crystalArray = ["assets/images/crystal1.png", "assets/images/crystal2.png", "assets/images/crystal3.png", "assets/images/crystal4.png"]

// Generates crystals on page and assigns random values to each.

function crystalValues () {

for (var i = 0; i < crystalArray.length; i++) {
    var crystalImage = $("<img>");
    crystalImage.addClass("crystal");
    crystalImage.attr("src", crystalArray[i]);
    crystalImage.attr("data-crystalvalue", Math.floor((Math.random() * 12) +1));
    console.log(crystalImage.attr("data-crystalvalue"));
    $("#crystals").append(crystalImage);
    unique.push(crystalImage);
}

// Defines function that checks for duplicate crystal values

function hasDuplicates(array) {
    var valuesSoFar = [];
    for (var j = 0; j < array.length; ++j) {
        var value = array[j].attr("data-crystalvalue");
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
}
console.log("Are there duplicate crystal values? " + hasDuplicates(unique));

// Defines functions that check if game is winnable

var isEven = unique.every(function (e) {
    return e.attr("data-crystalvalue") % 2 == 0;
});
console.log("Are all the crystal values even?" + isEven); // false

// var oddGoal =function isEven(value) {
// 	if (value%2 == 0)
// 		return true;
// 	else
// 		return false;
// }

// console.log("Is the goal value odd?" + )

// If there are duplicate crystal values or if game is unwinnable, create a new set of crystals

if ((hasDuplicates(unique)) == true) {
    $("#crystals").empty();
    unique = [];
    crystalValues();
}
}

// Sets up game

function play() {

var currentValue = 0;
$("#current").text("My score: " + currentValue);

var goalValue = Math.floor((Math.random() * (120-19) + 19));
$("#goal").text("Goal : " + goalValue);
console.log ("The current goal is " + goalValue);


$(".crystal").on("click", function() {
    
    // Gets randomly-assigned value from crystal that user clicks and adds it to current score
    
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    console.log("Current value of this crystal is " + crystalValue);
    currentValue += crystalValue;
    $("#current").text("My score: " + currentValue);
    console.log("Current score is " + currentValue);

    // Sets win condition, increments winCount, resets game

    if (currentValue === goalValue) {
        winCount++;
        $("#wins").text("Wins: " + winCount);
        $("#crystals").empty();
        crystalValues();
        play();
    }

    // Sets loss condition, increments lossCount, resets game

    else if (currentValue >= goalValue) {
        lossCount++;
        $("#losses").text("Losses: " + lossCount);
        $("#crystals").empty();
        crystalValues();
        play();
    }

});

}

// Calls functions for initial game set-up

crystalValues();
play();

})