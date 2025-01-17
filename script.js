const prompts = [
    "Nacht",
    "Winterlandschaft",
    "Kälte",
    "Gute Vorsätze",
    "Erste Blumen im Schnee",
    "Gemütlichkeit",
    "Selbstfindung"
  ];
  
// Function to get a random prompt
function getRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

// Event listener for the button
document.getElementById("generate-btn").addEventListener("click", () => {
  const promptDisplay = document.getElementById("prompt-display");
  promptDisplay.textContent = getRandomPrompt();
});