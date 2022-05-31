const wordElement = document.getElementById('word');
const wrongGuesses = document.getElementById('wrong-letter-display');
const inputCheck = document.getElementById('input-check');
const notification =document.getElementById('notification');
const notifText = document.getElementById('notif-text');
const parts = document.querySelectorAll('.sad-dude-part');
const body = document.querySelector('main');
const restart = document.getElementById('restart-btn');

const startGame = async () => {
    fetch(`https://random-word-api.herokuapp.com/word?length=6`)
        .then(res => res.json())
        .then(data => {
            let selectedWord = data[0];
            console.log(selectedWord);

            let correctLetters = [];
            let wrongLetters = [];

            window.addEventListener('keydown', keyDownEvent);

            function keyDownEvent(e) {
                let guessedLetter = e.key;
                console.log(guessedLetter);
                if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode ==222) {
                    if(selectedWord.includes(guessedLetter)) {
                        if(!correctLetters.includes(guessedLetter)) {
                            correctLetters.push(guessedLetter);
                            loadWords();
                        } else {
                            let e = "You Have Already Entered This Letter!";
                            showInputCheck(e);
                        }; 
                    } else {
                        if(!wrongLetters.includes(guessedLetter)) {
                            wrongLetters.push(guessedLetter);
                            loadWrongLetters();
                            loadParts();
                            loseCheck();
                        } else {
                            let e = "You Have Already Entered This Letter!";
                            showInputCheck(e);
                        }
                    };
                } else {
                    let e = "Please Enter A Valid Letter!";
                    showInputCheck(e);
                }
            };

            function loadWords() {
                wordElement.innerHTML = `${selectedWord.split('').map(letter => `<p class="line">${correctLetters.includes(letter) ? letter : ""}</p>`).join('')}`;
                const fullWord = wordElement.innerText.replace(/\n/g, "");

                if(fullWord === selectedWord.toLocaleUpperCase("en")) {
                    notification.style.display = "flex";
                    notification.style.backgroundColor = "rgb(26, 226, 59)";
                    notifText.textContent = "Congratulations!"
                    body.style.opacity = "0.5";
                    window.removeEventListener('keydown', keyDownEvent);
                };
            };

            function showInputCheck(e) {
                inputCheck.innerHTML = `${e}`;
                inputCheck.style.display = "block";
                setTimeout(() => {
                    inputCheck.style.display = "none";
                }, 1500);
            };

            function loadWrongLetters() {
                wrongGuesses.textContent = `${wrongLetters}`;
            };

            function loseCheck() {
                if(wrongLetters.length == 6) {
                    notification.style.display = "flex";
                    notification.style.backgroundColor = "rgb(172, 38, 38)";
                    notifText.textContent = `You Lost! The Word Was: "${selectedWord.toLocaleUpperCase("en")}"`;
                    notifText.style.color = "white";
                    body.style.opacity = "0.5";
                    window.removeEventListener('keydown', keyDownEvent);
                };
            };

            function loadParts() {
                parts.forEach((part, index) => {
                    if(index < wrongLetters.length) {
                        part.style.display = "block";
                    } else {
                        part.style.display = 'none';
                    };
                    console.log(part);
                });
            };

            restart.addEventListener('click', e => {
                document.location.reload(true);
            });

            loadWords();
    })};

startGame();



