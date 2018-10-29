const axios = require('axios');

const randomWord = {
    // Properties
    guessNumber: 0,
    guessArray: [],
    returnedword: 'test',
    randomWordUrl: 'https://nlp.fi.muni.cz/projekty/random_word/run.cgi?language_selection=en&word_selection=verbs&model_selection=use&length_selection=&probability_selection=true',

    // Methods
    // Grab a random word from an API
    getRandomWord: function () {
        axios.get(this.randomWordUrl)
            .then((result) => {
                this.returnedword = result.data
                console.log(result.data);
                // console.log(result.data.length);
            }).catch((err) => {
                console.log(err)
            })
    },

    // Setup for the game
    // Remove the extra space behind the word
    // Fill guess array with '_' to show progress
    setGame: function () {
        if (this.returnedword) {
            this.guessNumber = (this.returnedword.length - 1);
        }

        console.log(`The length of the random word is: ${this.guessNumber}`);

        for (let count = 0; count <= this.guessNumber; count++) {
            this.guessArray.push('_');
        }
    },

    // Check the guessed letter and replace and values if it matches them in the array
    wordCheck: function(array, guess) {
        array.forEach((element, index) => {
            if (guess === element) {
                this.guessArray[index] = guess;
            }
        });
        console.log(this.guessArray);
    }
};

module.exports = randomWord;