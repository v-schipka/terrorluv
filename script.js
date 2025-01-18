const prompts = [
    "Nacht",
    "Winterlandschaft",
    "Kälte",
    "Gute Vorsätze",
    "Erste Blumen im Schnee",
    "Gemütlichkeit",
    "Selbstfindung"
  ];

  const challenges = [
    "schwarz/weiß",
    "Bleistift",
    "Bunt(stift)"
  ];

  // Get elements
const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");
const challengeBtn = document.getElementById("challenge-btn");
const promptDisplay = document.getElementById("prompt-display");
const challengeDisplay = document.getElementById("challenge-display");

// Event listener for the "Get a Prompt" button
generateBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  promptDisplay.textContent = `Thema: ${prompts[randomIndex]}`;
  generateBtn.disabled = true; // Disable the button after a prompt is shown
});

// Event listener for the "Reset" button
resetBtn.addEventListener("click", () => {
  promptDisplay.textContent = "Click the \"Get a Prompt\" button to get started!";
  generateBtn.disabled = false; // Re-enable the "Get a Prompt" button
  challengeDisplay.textContent = ""; // Clear the challenge (optional, can be removed)
});

// Event listener for the "Get a Challenge" button
challengeBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  challengeDisplay.textContent = `Deine Herausforderung: ${challenges[randomIndex]}`;
});