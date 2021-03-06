$(document).ready(function() {

// Starting values
var winCount = 0;
var lossCount = 0;
$("#wins").text("Wins: " + winCount);
$("#losses").text("Losses: " + lossCount);

// Variable to check if crystal values are unique
var unique = [];

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

// If there are duplicate crystal values, create a new set of crystals

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
$("#goal").text("Goal: " + goalValue);
console.log ("The current goal is " + goalValue);

// Checks if all crystal values are even and if game is winnable

var isEven = unique.every(function (e) {
    return e.attr("data-crystalvalue") % 2 == 0;
});
console.log("Are all the crystal values even? " + isEven);

function isOdd(value) {
	if (value%2 == 0)
		return false;
	else
		return true;
}

console.log("Is the goal value odd? " + isOdd(goalValue));

// If game is not winnable, reset the goal value

if ((isEven == true) && ((isOdd(goalValue)) == true)) {
    goalValue = Math.floor((Math.random() * (120-19) + 19));
    $("#goal").text("Goal: " + goalValue);
    console.log ("The current goal has been reset to " + goalValue);
}

// Defines on-click function for crystals

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
        alert("You won!");
        $("#wins").text("Wins: " + winCount);
        $("#crystals").empty();
        crystalValues();
        play();
    }

    // Sets loss condition, increments lossCount, resets game

    else if (currentValue >= goalValue) {
        lossCount++;
        alert("You lost!");
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