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
const challengeDisplay = document.getElementById("challenge-display");

//-----------------------------------------------------

// TOC
document.addEventListener("DOMContentLoaded", function () {
  const tocList = document.getElementById("toc-list");

  // Select all h1 headers on the page
  const headers = document.querySelectorAll("h2");

  // Generate TOC dynamically based on h1 headers
  headers.forEach((header, index) => {
    const tocItem = document.createElement("li");
    const tocLink = document.createElement("a");

    tocLink.href = `#${header.id}`; // Link to the corresponding h1 header
    tocLink.textContent = header.textContent; // Use header text as TOC item text

    tocItem.appendChild(tocLink);
    tocList.appendChild(tocItem);
  });
});

//--------------------------------------------------------

// Display the current prompt from Firebase
promptRef.on("value", (snapshot) => {
  const prompt = snapshot.val();
  if (prompt) {
    promptDisplay.textContent = "Unser Thema: " + prompt;
    generateBtn.disabled = true;
  } else {
    promptDisplay.textContent = "";
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
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const selectedPrompt = prompts[randomIndex];
  promptRef.set(selectedPrompt); // Save the prompt to Firebase
});

// Event listener for "Reset" button
resetBtn.addEventListener("click", () => {
  promptRef.remove(); // Clear the prompt from Firebase
  challengeDisplay.textContent = ""; // Optionally clear the challenge
});

// Event listener for "Get A Challenge" button
challengeBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  const selectedChallenge = challenges[randomIndex];
  challengeDisplay.textContent = `Deine Herausforderung: ${selectedChallenge}`;
  localStorage.setItem("currentChallenge", selectedChallenge); // Save the challenge to localStorage
});

//---------------------------------------------------

// Rechner
document.getElementById('valuesForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const angriffskraft = parseFloat(document.getElementById('angriffskraft').value) || 0;
  const ko = parseFloat(document.getElementById('ko').value) || 0;

  // Perform calculation: Angriffskraft * (1 - (KOs / 1000))
  const result = angriffskraft * (1 - (ko / 1000));
  // Calculate fight-result-ele-plus
  let multiplierPlus = 1;
  if (ko < 50) {
      multiplierPlus = 1;
  } else if (ko >= 50 && ko < 100) {
      multiplierPlus = 0.9;
  } else if (ko >= 100 && ko < 200) {
      multiplierPlus = 0.75;
  } else if (ko >= 200 && ko < 250) {
      multiplierPlus = 0.65;
  } else if (ko >= 250 && ko < 400) {
      multiplierPlus = 0.5;
  } else if (ko > 400) {
      multiplierPlus = 0.25;
  }
  const resultElePlus = result * multiplierPlus;

  // Format numbers in German style
  const formatNumber = (num) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);

  // Display results in the respective <p> elements
  document.getElementById('fight-result').textContent = `Ohne Elemente: ${formatNumber(result)}`;
  document.getElementById('fight-result-ele-plus').textContent = `Mit Element-Vorteil: ${formatNumber(resultElePlus)}`;
});

//-------------------------------------------------------


// Google Sheets API connection
const API_KEY = "AIzaSyD8rfdaN1J-Kt3xx9t5DPz_CNEzVOlY1j0"; // Replace with your API Key
const SPREADSHEET_ID = "1un5DNaQi0TkKvEWdzyIGXXKq1IOnLCAp4e_iC6RlsAk"; // Extract the ID from your Google Sheets URL

// Fetch and display Google Sheets data
// Fetch and display Google Sheets data
async function loadSheetData(range, tableContainerId) {
  const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Parse rows and columns
    const [headers, ...rows] = data.values;

    // Build HTML table
    let tableHTML = "<table class='data-table'><thead><tr>";

    // Add column headers
    headers.forEach((header, index) => {
      tableHTML += `<th onclick="sortTable('${tableContainerId}', ${index})">${header} <span class="arrow asc"></span></th>`;
    });
    tableHTML += "</tr></thead><tbody>";

    // Add rows
    rows.forEach((row) => {
      tableHTML += "<tr>";
      row.forEach((cell) => {
        tableHTML += `<td>${cell}</td>`;
      });
      tableHTML += "</tr>";
    });

    tableHTML += "</tbody></table>";

    // Add table to the specified container
    document.getElementById(tableContainerId).innerHTML = tableHTML;
  } catch (error) {
    console.error("Error loading sheet data:", error);
    document.getElementById(tableContainerId).innerHTML = "<p>Error loading data. Please try again later.</p>";
  }
}

// Function to sort the table by a column
let sortOrder = {}; // Keeps track of the sort order for each column

function sortTable(tableContainerId, columnIndex) {
  const table = document.querySelector(`#${tableContainerId} .data-table`);
  if (!table) return;

  const rows = Array.from(table.rows).slice(1); // Get all rows excluding header
  const isNumericColumn = !isNaN(rows[0].cells[columnIndex].innerText);

  // Toggle the sort order for the column
  const key = `${tableContainerId}-${columnIndex}`;
  const currentOrder = sortOrder[key] || 'asc'; // Default to ascending order
  const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
  sortOrder[key] = newOrder;

  // Sort rows based on the column index and type (numeric or text)
  rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].innerText;
    const cellB = b.cells[columnIndex].innerText;

    if (isNumericColumn) {
      return newOrder === 'asc' ? parseFloat(cellA) - parseFloat(cellB) : parseFloat(cellB) - parseFloat(cellA);
    } else {
      return newOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  // Reattach sorted rows to the table
  rows.forEach(row => table.appendChild(row));

  // Update the header arrow direction
  updateHeaderArrow(tableContainerId, columnIndex, newOrder);
}

// Function to update the arrow direction in the header
function updateHeaderArrow(tableContainerId, columnIndex, order) {
  const headers = document.querySelectorAll(`#${tableContainerId} .data-table th`);
  
  // Reset all arrows
  headers.forEach(header => {
    header.querySelector(".arrow").classList.remove("asc", "desc");
  });

  // Update the arrow for the sorted column
  const header = headers[columnIndex];
  const arrow = header.querySelector(".arrow");
  arrow.classList.add(order); // Add the correct class (asc or desc)
}

// Load both sheets
loadSheetData("dias", "table-container");
loadSheetData("apples", "table-container-apples");
loadSheetData("juwelen", "table-container-juwelen");
loadSheetData("truppen", "table-container-truppen");

//----------------------------------------------------

//Dynamic scroll padding for mobile
function updateScrollPadding() {
  const toc = document.querySelector('.toc-container');
  if (toc && window.innerWidth <= 768) { 
    document.documentElement.style.scrollPaddingTop = `${toc.offsetHeight + 30}px`; // Add extra space
  } else {
    document.documentElement.style.scrollPaddingTop = "2em"; // Default for larger screens
  }
}

// Run on load and when resizing
window.addEventListener('load', updateScrollPadding);
window.addEventListener('resize', updateScrollPadding);