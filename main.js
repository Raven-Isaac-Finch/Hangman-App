const wordElement = document.getElementById('word');

const words = ["java", "python", "patates", "sucuk", "raven", "jerjer"]

selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

let correctLetters = [];
let wrongLetters = [];
let selectedWordArray = selectedWord.split('');

window.addEventListener('keydown', e => {
    let guessedLetter = e.key;
    console.log(guessedLetter);
    
        if(selectedWord.includes(guessedLetter)) {
            if(!correctLetters.includes(guessedLetter)) {
                correctLetters.push(guessedLetter);
                loadWords();
                console.log(correctLetters);
            } else {
                return
            }; 
        } else {
            if(!wrongLetters.includes(guessedLetter)) {
                wrongLetters.push(guessedLetter);
                console.log(wrongLetters);
            };
        };

});

function loadWords() {
    selectedWordArray.forEach(letter => {
        let letterLines = document.createElement('div');
        letterLines.className = 'line';
        if(correctLetters.includes(letter)) {
            letterLines.textContent = `${letter}`;
        } else {
            letterLines.textContent = ' ';
        }

        wordElement.appendChild(letterLines);
    });
};

// function alreadyEntered() {

// };

loadWords();