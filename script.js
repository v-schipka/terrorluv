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


// Load the current prompt from localStorage (if it exists)
const savedPrompt = localStorage.getItem("currentPrompt");
if (savedPrompt) {
  promptDisplay.textContent = savedPrompt;
  generateBtn.disabled = true; // Disable button if a prompt is already active
}

// Event listener for the "Get a Prompt" button
generateBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const selectedPrompt = prompts[randomIndex];
  promptDisplay.textContent = `Thema: ${prompts[randomIndex]}`;
  localStorage.setItem("currentPrompt", selectedPrompt); // Save prompt to localStorage
  generateBtn.disabled = true; // Disable the button
});

// Event listener for the "Reset" button
resetBtn.addEventListener("click", () => {
  promptDisplay.textContent = "Erhalte ein zufälliges Thema!";
  localStorage.removeItem("currentPrompt"); // Clear the saved prompt
  generateBtn.disabled = false; // Re-enable the "Get a Prompt" button
  challengeDisplay.textContent = ""; // Optionally clear the challenge
});


// Event listener for the "Get a Challenge" button
challengeBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  challengeDisplay.textContent = `Deine Herausforderung: ${challenges[randomIndex]}`;
});