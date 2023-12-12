"use strict";

const showTopButton = function (difficulty) {
  const topButton = document.querySelector(".top-button");
  switch (difficulty) {
    case "easy":
    case "medium":
    case "hard":
      topButton.classList.remove("hidden");
      break;
    default:
      topButton.classList.add("hidden");
  }
};

document.querySelectorAll(".difficulty-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const difficulty = this.dataset.difficulty;
    handleDifficulty(difficulty);
    document.querySelector(".dropbtn").textContent =
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  });
});

const handleDifficulty = function (difficulty) {
  showTopButton(difficulty);
  // Add other logic based on difficulty level changes if needed
};

document.querySelectorAll(".difficulty-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const difficulty = this.dataset.difficulty;
    handleDifficulty(difficulty);
  });
});

document.querySelectorAll(".difficulty").forEach((btn) => {
  btn.addEventListener("click", function () {
    const difficulty = this.dataset.difficulty;
    updateDifficultyLabel(difficulty);
    handleDifficulty(difficulty);
  });
});

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  console.log("CHECK BUTTON CLICKED");
  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number!");

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      document.querySelector(".score").textContent = 0;
    }
  }
});

// Handling difficulty button input

document.querySelector(".again").addEventListener("click", function () {
  let difficultyFactor;
  switch (currentDifficulty) {
    case "easy":
      difficultyFactor = 20;
      break;
    case "medium":
      difficultyFactor = 50;
      break;
    case "hard":
      difficultyFactor = 100;
      break;
    default:
      // Handle default or error case
      break;
  }

  score = difficultyFactor;
  secretNumber = Math.trunc(Math.random() * difficultyFactor) + 1;

  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
