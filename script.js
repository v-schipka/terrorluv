const prompts = [
    "Karneval",
    "erste Blumen im Schnee",
    "Valentinstag",
    "Jules Verne",
    "Erich Kästner",
    "Kawaii",
    "Pokemon",
    "Sonnenuntergang",
    "Der Winter verschwindet",
    "Fastenzeit",
    "Natur im Februar",
    "Sternzeichen Fische/Wassermann",
    "Wintersport/Urlaub in den Bergen",
    "Apres-Ski"
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


// Google Sheets API connection
const API_KEY = "AIzaSyD8rfdaN1J-Kt3xx9t5DPz_CNEzVOlY1j0"; // Replace with your API Key
const SPREADSHEET_ID = "1un5DNaQi0TkKvEWdzyIGXXKq1IOnLCAp4e_iC6RlsAk"; // Extract the ID from your Google Sheets URL

let truppenData = []; // Store only "truppen" data

// Fetch and store Google Sheets data
async function loadSheetData(range, tableContainerId) {
  const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Parse headers and rows
    const [headers, ...rows] = data.values;

    // Store only "truppen" data for filtering
    if (range === "truppen") {
      truppenData = rows; // Save only this dataset for filtering
    }

    // Render the table in its respective container
    renderTable(headers, rows, tableContainerId);
  } catch (error) {
    console.error(`Error loading sheet data:`, error);
    document.getElementById(tableContainerId).innerHTML = `<p>Error loading data. Please try again later.</p>`;
  }
}

// Function to render a table, removing columns 1 and 3 only for "truppen"
function renderTable(headers, rows, tableContainerId) {
  let tableHTML = `<table class='data-table' id='${tableContainerId}-table'><thead><tr>`;

  // Determine whether to exclude columns based on the table ID
  const isTruppenTable = (tableContainerId === "filtered-table-container");

  /// Add column headers with sorting
  headers.forEach((header, index) => {
    if (!isTruppenTable || (index !== 1 && index !== 3)) {
      tableHTML += `<th onclick="sortTable('${tableContainerId}-table', ${index})">${header} <span class="arrow"></span></th>`;
    }
  });
  tableHTML += "</tr></thead><tbody>";

  // Add rows while excluding columns for "truppen"
  rows.forEach(row => {
    tableHTML += "<tr>";
    row.forEach((cell, index) => {
      if (!isTruppenTable || (index !== 1 && index !== 3)) {
        tableHTML += `<td>${cell}</td>`;
      }
    });
    tableHTML += "</tr>";
  });

  tableHTML += "</tbody></table>";

  // Insert table into the correct container
  document.getElementById(tableContainerId).innerHTML = tableHTML;
}

// Function to filter only the "truppen" table
function filterTruppenTable(result) {
  if (!truppenData.length) return;

  const headers = ["Name", "Gesamtstärke [Mio]", "Stärkster Trupp [Mio]", "2. stärkster Trupp [Mio]", "Feuer", "Pflanze", "Wasser"];

  const filteredRows = truppenData.filter(row => {
    const staerksterTrupp = parseFloat(row[2].replace(",", ".")) || 0; // Convert German numbers

    return staerksterTrupp > result;
  });

  // Render only the filtered "truppen" table
  renderTable(headers, filteredRows, "filtered-table-container");
}

// Function to sort the table by a column
let sortOrder = {}; // Keeps track of sort order per column

function sortTable(tableId, columnIndex) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const rows = Array.from(table.rows).slice(1); // Exclude header row
  const isNumericColumn = rows.every(row => !isNaN(row.cells[columnIndex].innerText.replace(/\./g, "").replace(",", ".")));

  const key = `${tableId}-${columnIndex}`;
  const newOrder = sortOrder[key] === 'asc' ? 'desc' : 'asc';
  sortOrder[key] = newOrder;

  rows.sort((a, b) => {
    let cellA = a.cells[columnIndex].innerText.trim();
    let cellB = b.cells[columnIndex].innerText.trim();

    if (isNumericColumn) {
      cellA = parseFloat(cellA.replace(/\./g, "").replace(",", "."));
      cellB = parseFloat(cellB.replace(/\./g, "").replace(",", "."));
      return newOrder === 'asc' ? cellA - cellB : cellB - cellA;
    } else {
      return newOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  rows.forEach(row => table.appendChild(row));

  updateHeaderArrow(table, columnIndex, newOrder);
}

// Update sorting arrow indicators
function updateHeaderArrow(table, columnIndex, order) {
  const headers = table.querySelectorAll("th .arrow");
  headers.forEach(arrow => arrow.classList.remove("asc", "desc"));

  const arrow = table.rows[0].cells[columnIndex].querySelector(".arrow");
  if (arrow) arrow.classList.add(order);
}

// Handle form submission and filtering for "truppen"
document.getElementById('valuesForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const angriffskraftInput = document.getElementById('angriffskraft');
  const angriffskraft = parseFloat(angriffskraftInput.value.replace(',', '.')) || 0;
  const ko = parseFloat(document.getElementById('ko').value) || 0;
  //const element = document.getElementById('element').value;

  // Perform calculations
  const result = angriffskraft * (1 - (ko / 1000));

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

  // Format and display calculation results
  const formatNumber = (num) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);

  document.getElementById('fight-result').textContent = `Ohne Elemente: ${formatNumber(result)}`;
  document.getElementById('fight-result-ele-plus').textContent = `Mit Element-Vorteil: ${formatNumber(resultElePlus)}`;

  // Filter and display only "truppen" table
  filterTruppenTable(result);
});

// Load all sheets but filter only "truppen"
loadSheetData("truppen", "table-container-truppen");
loadSheetData("dias", "table-container");
loadSheetData("apples", "table-container-apples");
loadSheetData("juwelen", "table-container-juwelen");


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