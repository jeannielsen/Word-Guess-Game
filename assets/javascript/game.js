

//create reference to DOM elements
var $newGameBtn = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

// create variables 

var wordBank = ["seaweed", "dolphin", "lobster", "scallop", "snapper", "anemone", "halibut", "herring", "octopus", "sealion", "anchovy", "sealion", "codfish", "sardine", "tilapia"];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = " ";
var pickedWordPlaceHolderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

//new game function

function newGame() {
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceHolderArr = [];


    // random word pick

    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // make placeholder for picked word
    for (var i = 0; i < pickedWord.length; i++) {

        if (pickedWord[i] === " ") {
            pickedWordPlaceHolderArr.push(" ");
        }
        else {
            pickedWordPlaceHolderArr.push("_ ");
        }
    }
    //write game information to DOM

    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceHolderArr.join(" ");
    $guessedLetters.textContent = incorrectLetterBank;

}
// Write functions for letter guess, make all letters lower case, put in placeholder and compare picked picked letter to word

function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        guessedLetterBank.push(letter);

        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                pickedWordPlaceHolderArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceHolderArr.join(" ");
        checkIncorrect(letter);
    }

    // If game is not running alert to click start, alert if letter has already been guessed

    else {
        if (gameRunning === false) {
            alert("Click Start Game Button to start over");
        } else {
            alert("You've already guessed that letter, try again");
        }
    }
}

function checkIncorrect(letter) {
    if (
        pickedWordPlaceHolderArr.indexOf(letter.toLowerCase()) === -1 &&
        pickedWordPlaceHolderArr.indexOf(letter.toUpperCase()) === -1) {
        guessesLeft--;
        incorrectLetterBank.push(letter);
        $guessedLetters.textContent = incorrectLetterBank.join(" ");
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
    }

    checkWin();
}

function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceHolderArr.join("").toLowerCase()) {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}


$newGameBtn.addEventListener("click", newGame);

document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}