// 
const randomWord = require('./random_word');
const inquirer = require('inquirer');

startGame();

function startGame() {
    randomWord.reset();
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuChoice',
        choices: ['Play a game', 'Exit the game'],
    }]).then((result) => {
        switch (result.menuChoice) {
            case 'Play a game':
                console.log('\nStarting the game ....');
                randomWord.getRandomWord().then(() => {
                    getGuess();
                })
                break;
            case 'Exit the game':
                process.exit();
                break;
        }
    }).catch((err) => {
        console.log(err);
    });
};
// Grab guess from the user
function getGuess() {
    console.log(`\nYou have guessed ${randomWord.guessChances} times total`);
    console.log(`You can guess ${randomWord.guessNumber} times total`);
    if (randomWord.guessChances < randomWord.guessNumber) {
        inquirer.prompt([{
            type: 'input',
            message: 'Choose a letter',
            name: 'menuLetter',
        }]).then(result => {
            firstLetter = result.menuLetter.charAt(0).toLowerCase();
            wordCheck(randomWord.returnedword.split(''), firstLetter);
            getGuess();
        })
    }
}

// Increase guess count
// Check the guessed letter and replace and values if it matches them in the array
// Check for win condition 
function wordCheck(array, guess) {
    randomWord.guessChances++;
    array.forEach((element, index) => {
        if (guess === element) {
            randomWord.guessArray[index] = guess;
        }
    });
    // Win condition 
    if (randomWord.guessArray.join('') === randomWord.returnedword) {
        console.log(`\nGood Job. Look like you won. Going back to menu`);
        console.log(`The word was ${randomWord.returnedword}`);
        startGame();
    } else if (randomWord.guessChances === randomWord.guessNumber) { // Lose condition
        console.log(`\nSorry you lose. Heading back to the menu`);
        console.log(`The word was ${randomWord.returnedword}`);
        startGame();
    }
    console.log(`\n${randomWord.guessArray}`);
}