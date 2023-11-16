// Define a function to update high scores
function updateHighScores(newScore) {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ name: "Player", score: newScore });
    highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order

    // Keep only the top 5 scores
    highScores = highScores.slice(0, 5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
}

window.onload = function () {
    var backgroundMusic = document.getElementById("backgroundMusic1");
    var startButton = document.getElementById("startButton");
    var tutorialButton = document.getElementById("tutorialButton");
    var settingsButton = document.getElementById("settingsButton");
    var volumeSlider = document.getElementById("volumeSlider");
    var highScoresButton = document.getElementById("highScoresButton");

    // Function to start the game
    startButton.addEventListener("click", function () {
        // Pass the high scores to the game page and start the game
        window.location.href = `space_shooter.html?highScores=${localStorage.getItem("highScores")}`;
    });
    // Function to display the tutorial modal
    tutorialButton.addEventListener("click", function () {
        var tutorialModal = document.getElementById("tutorialModal");
        tutorialModal.style.display = "block";

        // Get the close icon in the tutorial modal
        var tutorialClose = tutorialModal.querySelector(".close");

        // Close the tutorial modal when the close icon is clicked
        tutorialClose.addEventListener("click", function () {
            tutorialModal.style.display = "none";
        });
    });

    // Function to open the high scores modal
    highScoresButton.addEventListener("click", function () {
        // Retrieve and display the high scores from local storage
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        var highScoresMessage = "High Scores:\n\n";
        highScores.forEach(function (entry, index) {
            highScoresMessage += `${index + 1}. ${entry.name}: ${entry.score}\n`;
        });

        if (highScores.length === 0) {
            highScoresMessage = "No high scores yet!";
        }

        // Show the high scores modal
        var highScoresModal = document.getElementById("highScoresModal");
        var highScoresContent = highScoresModal.querySelector(".modal-content");
        highScoresContent.textContent = highScoresMessage;
        highScoresModal.style.display = "block";
        // Get the close icon in the high scores modal
    var highScoresClose = highScoresModal.querySelector(".close");

    // Close the high scores modal when the close icon is clicked
    highScoresClose.addEventListener("click", function () {
        highScoresModal.style.display = "none";
    });
});

    // Function to open the settings modal
    settingsButton.addEventListener("click", function () {
        // Show the settings modal
        var settingsModal = document.getElementById("settingsModal");
        settingsModal.style.display = "block";

        // Get a reference to the close button in the settings modal
        var closeBtn = document.querySelector("#settingsModal .close");

        // Close the modal when the user clicks the close button
        closeBtn.addEventListener("click", function () {
            settingsModal.style.display = "none";
        });

        // Adjust the background music volume based on the slider value
        volumeSlider.addEventListener("input", function () {
            backgroundMusic.volume = parseFloat(volumeSlider.value);
        });
    });
}
