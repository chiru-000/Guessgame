const startButton = document.querySelector('#start-button');
const submitButton = document.querySelector('#submit-button');
const input = document.querySelector('#guess-input');
const feedback = document.querySelector('#feedback');
const chancesDisplay = document.querySelector('#chances-count');
const timerDisplay = document.querySelector('#timer-count');
const endScreen = document.querySelector('#game-over-screen');
const endMessage = document.querySelector('#end-message');
const playAgainButton = document.querySelector('#play-again-button');
const gameContainer = document.getElementById("game-container");

let secretNumber;
let chances;
let startTime;
let timerId;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    chances = Math.min(Math.max(Math.ceil(secretNumber * 0.2), 5), 10);
    startTime = Date.now();

    input.value = '';
    feedback.textContent = '';
    chancesDisplay.textContent = chances;
    timerDisplay.textContent = '0';

    endScreen.style.display = 'none';

    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(updateTimer, 1000);

    // Show the game interface
    input.style.display = 'block';
    submitButton.style.display = 'block';
    chancesDisplay.parentElement.style.display = 'block';
    timerDisplay.parentElement.style.display = 'block';
    feedback.style.display = 'block';

    // Hide the start and play again buttons
    startButton.style.display = 'none';
    playAgainButton.style.display = 'none';
}

function updateTimer() {
    const currentTime = Date.now();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = timeElapsed;
}

function endGame(didWin) {
    clearInterval(timerId);

    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    timerDisplay.textContent = timeTaken;

    endMessage.textContent = didWin ? 'Congratulations! You won!' : `Sorry, you lost. The number was ${secretNumber}.`;
    endScreen.style.display = 'block';

    // Hide the game interface
    input.style.display = 'none';
    submitButton.style.display = 'none';
    chancesDisplay.parentElement.style.display = 'none';
    timerDisplay.parentElement.style.display = 'none';
    feedback.style.display = 'none';

    if (!didWin) {
        // Only show the start button again if the player lost
        startButton.style.display = 'block';
    } else {
        // If the player won, hide the start button and show the play again button
        startButton.style.display = 'none';
        playAgainButton.style.display = 'block';
    }
}

startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', startGame);

submitButton.addEventListener('click', () => {
    const guess = Number(input.value);

    if (guess < 1 || guess > 100) {
        feedback.textContent = 'Please guess a number between 1 and 100.';
        return;
    }

    if (guess === secretNumber) {
        feedback.textContent = '';
        endGame(true);
    } else {
        feedback.textContent = guess > secretNumber ? 'Your guess is too high!' : 'Your guess is too low!';
        chances--;
        chancesDisplay.textContent = chances;

        if (chances <= 0) {
            feedback.textContent = '';
            endGame(false);
        }
    }
});

// Hide the game interface initially
startButton.style.display = 'block'; // Start button is initially visible
playAgainButton.style.display = 'none'; // Play again button is initially hidden
input.style.display = 'none';
submitButton.style.display = 'none';
chancesDisplay.parentElement.style.display = 'none';
timerDisplay.parentElement.style.display = 'none';
feedback.style.display = 'none';
