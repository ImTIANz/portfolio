
var numSelected = null;
var tileSelected = null;

var errors = 0;
var startTime = null;
var timerInterval = null;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() {
    setGame();
    setupTimer();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
        document.getElementById("startButton").addEventListener("click", startTimer);
        document.getElementById("resetButton").addEventListener("click", resetTimer);
    }

    // Add event listener to the Instructions button
document.getElementById("instructionsButton").addEventListener("click", function() {
    document.getElementById("instructionsModal").classList.add("show");
});

// Add event listener to the close button
document.getElementById("closeInstructions").addEventListener("click", function() {
    document.getElementById("instructionsModal").classList.remove("show");
});

    
    function setupTimer() {
        // Display the initial timer value
        updateTimerDisplay(0);
    }
    
    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const displaySeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        document.getElementById("timer").innerText = `${displayMinutes}:${displaySeconds}`;
    }
    
    function startTimer() {
        if (startTime === null) {
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
            document.getElementById("startButton").disabled = true; // Disable the Start button
        }
    }
    
    function updateTimer() {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        updateTimerDisplay(elapsedSeconds);
    }
    
    function resetTimer() {
        clearInterval(timerInterval);
        startTime = null;
        updateTimerDisplay(0);
        document.getElementById("startButton").disabled = false; // Enable the Start button
    }

    // Define audio elements
var correctSound = document.getElementById("correctSound");
var incorrectSound = document.getElementById("incorrectSound");


function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            playCorrectSound(); // Play correct move sound
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            playIncorrectSound(); // Play incorrect move sound
        }
    }
}

function playCorrectSound() {
    correctSound.play();
}

function playIncorrectSound() {
    incorrectSound.play();
}

// Add event listener to the Check button
document.getElementById("checkButton").addEventListener("click", checkForVictory);

function checkForVictory() {
    let isVictory = true;

    // Loop through the board and compare each cell with the solution
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const tile = document.getElementById(`${r}-${c}`);
            const solutionDigit = solution[r][c];
            const currentDigit = tile.innerText;

            // If the current digit is different from the solution, mark it as incorrect
            if (currentDigit !== solutionDigit) {
                isVictory = false;
                tile.classList.add("incorrect");
            } else {
                tile.classList.remove("incorrect");
            }
        }
    }

    // If isVictory is true, display a victory message and allow starting a new game
    if (isVictory) {
        alert("Congratulations! You solved the puzzle!");
       
    }
}



    

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}





