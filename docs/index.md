
Willkommen im Archiv für Dokumente, diverse Informationen und mehr. :smile:

<hr>

### :octicons-link-16: Wichtige Links

- [Gildenstärke (Danke an Mori)](https://docs.google.com/spreadsheets/d/1un5DNaQi0TkKvEWdzyIGXXKq1IOnLCAp4e_iC6RlsAk/edit?gid=1599865612#gid=1599865612)
- [Werte der SSR Karten (Danke an Elster)](https://drive.google.com/file/d/1df3aBtCpWeA5c6tdAaS-SU5cuKn0Px1C/view)
- [Übersicht der Edelsteine, Effekte und Fähigkeiten (Danke an WeWe)](https://docs.google.com/document/d/1D1xLKf5k3frzplmc-OzoTGBK_OnukqNn/view) 
- [Tips & Tricks (Danke an Maylenchen)](https://docs.google.com/document/d/1qIff2fPwty_aMW6jFcX2SpbAdU3nh94ozDURiyPZM7k)

<hr>

### :material-food-apple: Äpfel

Anzahl bunter Äpfel zum Aufleveln:

<div class="sheet-container" data-range="apples!A1:E9"></div>

<hr>

### :material-cards-diamond: Juwelen

Juwelen und deren Effekte:

<div class="sheet-container" data-range="juwelen!A1:D11"></div>

<hr>

### :fontawesome-solid-cart-shopping: Diamantenshop

Preis/Leistungsverhältnis:

<div class="sheet-container" data-range="dias!A1:F33"></div>

<hr>

### :material-calendar: Events

Vorhersagen ohne Gewähr :wink:

:material-water-well: - Wunschbrunnen<br>
:material-shovel: - Mr. Mo's Goldminen Bonus<br>
:material-diamond-stone: - Ausgabemission

| Datum | Brunnen | Goldmine| Bonus |
|---------|---------|---------|---------|
| <s>Freitag, 17. Januar 2025</s> | :material-water-well: | :material-shovel: | |
| <s>Freitag, 31. Januar 2025</s> | :material-water-well: |  | :material-diamond-stone: |
| <s>Freitag, 14. Februar 2025</s> | :material-water-well: | :material-shovel: | |
| <s>Freitag, 28. Februar 2025</s> | :material-water-well: | | :material-diamond-stone: |
| <s>Freitag, 14. März 2025</s> | :material-water-well: | :material-shovel: | |
| <s>Montag, 31. März 2025</s> | :material-water-well: | | :material-diamond-stone: |
| Freitag, 18. April 2025 | :material-water-well: | :material-shovel: | |
| Mittwoch, 30. April 2025 | :material-water-well: | | :material-diamond-stone: |
| Freitag, 16. Mai 2025 | :material-water-well: | :material-shovel: | |
| Samstag, 31. Mai 2025 | :material-water-well: | | :material-diamond-stone: |
| Freitag, 20. Juni 2025 | :material-water-well: | :material-shovel: | |
| Montag, 30. Juni 2025 | :material-water-well: | | :material-diamond-stone: |
| Freitag, 17. Juli 2025 | :material-water-well: | :material-shovel: | |
| Donnerstag, 31. Juli 2025 | :material-water-well: | | :material-diamond-stone: |
| Freitag, 15. August 2025 | :material-water-well: | :material-shovel: | |
| Sonntag, 31. August 2025 | :material-water-well: | | :material-diamond-stone: |
| Freitag, 12. September 2025 | :material-water-well: | :material-shovel: | |
| Donnerstag, 30. September 2025 | :material-water-well: | | :material-diamond-stone: |
| Freitag, 17. Oktober 2025 | :material-water-well: | :material-shovel: | |
| Freitag, 31. Oktober 2025 | :material-water-well: | | :material-diamond-stone: |
| Freitag, 14. November 2025 | :material-water-well: | :material-shovel: | |
| Sonntag, 30. November 2025 | :material-water-well: | :material-diamond-stone: | |
| Freitag, 12. Dezember 2025 | :material-water-well: | | :material-shovel: |
| Mittwoch, 31. Dezember 2025 | :material-water-well: | :material-diamond-stone: | |

<hr>

### :material-draw-pen: Künstler-Challenge

Einmal im Monat werden 2 zufällige Themen aus einem Themen-Pool gezogen. 
Um ein Thema in den Pool einzukippen, poste das Thema einfach in dem *#zeichnen-tipps-und-tricks* Kanal in Discord.

Sobald die Themen verfügbar sind, suche dir eines aus und klicke auf **[Gib mir eine Herausforderung!]**, um eine zufällige Technik für dein Bild zu erhalten.
Am Ende des Monats werden die fertigen Bilder im *#zeichnen-challenge-bilder* Kanal gepostet.

<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>

<div>
<button class="button" id="generate-btn">Gib uns ein Thema!</button>
<button class="button" id="challenge-btn">Gib mir eine Herausforderung!</button>
<button class="button" id="reset-btn">Thema zurücksetzen!</button>
<p id="prompt-display">Thema #1: </p>
<p id="prompt-display2">Thema #2: </p> 
<p id="challenge-display">Deine Herausforderung: </p>
<hr>
</div>


<script>
const prompts = [
  "Ostern",
  "Qualle",
  "Unterwasserwelt",
  "Hans Christian Andersen",
  "Albert Uderzo",
  "Wilhelm Busch",
  "Terry Pratchett",
  "Aprilscherze",
  "Kirschblüten",
  "Küken",
  "Lämmer"
];

const challenges = [
  "schwarz/weiß",
  "Bleistift",
  "Bunt(stift)"
];

// Firebase Configuration
const firebaseConfig = {
apiKey: "AIzaSyDNSlPCgxiA7l95236N6blyIUjcpx9rsnM",
authDomain: "terrorluv-15727.firebaseapp.com",
databaseURL: "https://terrorluv-15727-default-rtdb.firebaseio.com",
projectId: "terrorluv-15727",
storageBucket: "terrorluv-15727.firebasestorage.app",
messagingSenderId: "252619984030",
appId: "1:252619984030:web:dfd02eede70cfada68bf8f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const promptRef = db.ref("currentPrompt");

// Get elements
const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");
const challengeBtn = document.getElementById("challenge-btn");
const promptDisplay = document.getElementById("prompt-display");
const promptDisplay2 = document.getElementById("prompt-display2");
const challengeDisplay = document.getElementById("challenge-display");

// Display the current prompts from Firebase
promptRef.on("value", (snapshot) => {
const promptsData = snapshot.val();

if (promptsData && promptsData.prompt1 && promptsData.prompt2) {
    promptDisplay.textContent = "Thema #1: " + promptsData.prompt1;
    promptDisplay2.textContent = "Thema #2: " + promptsData.prompt2;
    generateBtn.disabled = true;
} else {
    promptDisplay.textContent = "Thema #1: ";
    promptDisplay2.textContent = "Thema #2: ";
    generateBtn.disabled = false;
}
});

// Check localStorage for a saved challenge
const savedChallenge = localStorage.getItem("currentChallenge");
if (savedChallenge) {
challengeDisplay.textContent = `Deine Herausforderung: ${savedChallenge}`;
}

// Event listener for "Get A Prompt" button
generateBtn.addEventListener("click", () => {
if (prompts.length < 2) {
    alert("Not enough prompts to select two different ones!");
    return;
}

let index1 = Math.floor(Math.random() * prompts.length);
let index2;
do {
    index2 = Math.floor(Math.random() * prompts.length);
} while (index1 === index2); // Ensure different prompts

const selectedPrompt1 = prompts[index1];
const selectedPrompt2 = prompts[index2];

// Save both prompts to Firebase
promptRef.set({
    prompt1: selectedPrompt1,
    prompt2: selectedPrompt2
});
});

// Event listener for "Reset" button
resetBtn.addEventListener("click", () => {
promptRef.remove(); // Clear the prompts from Firebase
promptDisplay.textContent = "Thema #1: ";
promptDisplay2.textContent = "Thema #2: ";
challengeDisplay.textContent = "Deine Herausforderung: ";
generateBtn.disabled = false;
});

// Event listener for "Get A Challenge" button
challengeBtn.addEventListener("click", () => {
const randomIndex = Math.floor(Math.random() * challenges.length);
const selectedChallenge = challenges[randomIndex];

challengeDisplay.textContent = `Deine Herausforderung: ${selectedChallenge}`;
localStorage.setItem("currentChallenge", selectedChallenge); // Save the challenge to localStorage
});
</script>


### :material-calculator: Kampf-Rechner

<form id="valuesForm">
    <label for="angriffskraft">Angriffskraft:</label><br>
    <input type="number" id="angriffskraft" name="angriffskraft" max="80000000" step="any" required><br>
    <label for="ko">Knock-Outs:</label><br>
    <input type="number" id="ko" name="ko" max="1000" required><br>

  <button type="submit">Berechnen</button>
</form>

<div class="results-container">
  <u><p id="fight-result">Ohne Elemente:</p></u>
  <u><p id="fight-result-ele-plus">Mit Element-Vorteil:</p></u>
</div>

<hr>

### :muscle: Truppenstärken

<div class="sheet-container" data-range="truppen!A1:H45" data-ignore="1,2,4" data-sort-numeric="1,2,3,4,5,6,7"></div>

