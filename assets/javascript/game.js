


// create variables 

var words = ["seaweed", "dolphin", "lobster", "scallop", "snapper", "anemone", "halibut", "herring", "octopus", "sealion", "anchovy", "sealion", "codfish", "sardine", "tilapia"];
var choosenWordArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];
var wins = 0;
var losses = 0;
var triesLeft = 8;
var isGameRunning = false;
var choosenWord = " ";


//create reference to DOM elements
var $newGameButton = document.getElementById("new-game-button");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");
var $guessedLetters = document.getElementById("guessed-letters");
var $triesLeft = document.getElementById("guesses-left");
var $placeholders = document.getElementById("placeholders");
//new game function

function newGame() {
    isGameRunning = true;
    triesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    choosenWordArr = [];


    // random word pick

    choosenWord = words[Math.floor(Math.random() * words.length)];

    // make placeholder for picked word
    for (var i = 0; i < choosenWord.length; i++) {

        if (choosenWord[i] === " ") {
            choosenWordArr.push(" ");
        }
        else {
            choosenWordArr.push("_ ");
        }
    }
    //write game information to DOM

    $triesLeft.textContent = triesLeft;
    $placeholders.textContent = choosenWordArr.join(" ");
    $guessedLetters.textContent = incorrectLetterBank;

}
// Write functions for letter guess, make all letters lower case, put in placeholder and compare picked picked letter to word

function letterGuess(letter) {

    if (isGameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        guessedLetterBank.push(letter);

        for (var i = 0; i < choosenWord.length; i++) {
            if (choosenWord[i].toLowerCase() === letter.toLowerCase()) {
                choosenWordArr[i] = choosenWord[i];
            }
        }
        $placeholders.textContent = choosenWordArr.join(" ");
        checkIncorrect(letter);
    }

    // If game is not running alert to click start, alert if letter has already been guessed

    else {
        if (isGameRunning === false) {
            alert("Click Start Game Button to start over");
        } else {
            alert("You've already guessed that letter, try again");
        }
    }
}

function checkIncorrect(letter) {
    if (
        choosenWordArr.indexOf(letter.toLowerCase()) === -1 &&
        choosenWordArr.indexOf(letter.toUpperCase()) === -1) {
        triesLeft--;
        incorrectLetterBank.push(letter);
        $guessedLetters.textContent = incorrectLetterBank.join(" ");
        $triesLeft.textContent = triesLeft;
    }
    checkLoss();
}

function checkLoss() {
    if (triesLeft === 0) {
        losses++;
        isGameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = choosenWord;
    }

    checkWin();
}

function checkWin() {
    if (choosenWord.toLowerCase() === choosenWordArr.join("").toLowerCase()) {
        wins++;
        isGameRunning = false;
        $wins.textContent = wins;
    }
}


$newGameButton.addEventListener("click", newGame);

document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}