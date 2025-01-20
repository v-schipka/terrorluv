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
const tableContainer = document.getElementById("table-container");

// Event listener for the "Get a Prompt" button
//generateBtn.addEventListener("click", () => {
 // const randomIndex = Math.floor(Math.random() * prompts.length);
 // const selectedPrompt = prompts[randomIndex];
 // promptDisplay.textContent = `Thema: ${prompts[randomIndex]}`;
 // generateBtn.disabled = true; // Disable the button
//});

// Event listener for the "Reset" button
//resetBtn.addEventListener("click", () => {
//  promptDisplay.textContent = "Erhalte ein zufälliges Thema!";
//  localStorage.removeItem("currentPrompt"); // Clear the saved prompt
//  generateBtn.disabled = false; // Re-enable the "Get a Prompt" button
//  challengeDisplay.textContent = ""; // Optionally clear the challenge
//});


// Event listener for the "Get a Challenge" button
challengeBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  challengeDisplay.textContent = `Deine Herausforderung: ${challenges[randomIndex]}`;
});

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
// Google Sheets APi connection
const API_KEY = "AIzaSyD8rfdaN1J-Kt3xx9t5DPz_CNEzVOlY1j0"; // Replace with your API Key
const SPREADSHEET_ID = "1un5DNaQi0TkKvEWdzyIGXXKq1IOnLCAp4e_iC6RlsAk"; // Extract the ID from your Google Sheets URL
const RANGE = "Dias"; // Adjust based on your sheet's name and range

// Fetch and display Google Sheets data
async function loadSheetData() {
  const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Parse rows and columns
    const [headers, ...rows] = data.values;

    // Build HTML table
    let tableHTML = "<table id='data-table'><thead><tr>";

    // Add column headers
    headers.forEach((header, index) => {
      tableHTML += `<th onclick="sortTable(${index})">${header} <span class="arrow asc"></span></th>`;
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

    // Add table to the container
    document.getElementById("table-container").innerHTML = tableHTML;
  } catch (error) {
    console.error("Error loading sheet data:", error);
    document.getElementById("table-container").innerHTML = "<p>Error loading data. Please try again later.</p>";
  }
}

// Function to sort the table by a column
let sortOrder = {}; // Keeps track of the sort order for each column

function sortTable(columnIndex) {
  const table = document.getElementById("data-table");
  const rows = Array.from(table.rows).slice(1); // Get all rows excluding header
  const isNumericColumn = !isNaN(rows[0].cells[columnIndex].innerText);

  // Toggle the sort order for the column
  const currentOrder = sortOrder[columnIndex] || 'asc'; // Default to ascending order
  const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
  sortOrder[columnIndex] = newOrder;

  // Sort rows based on the column index and type (numeric or text)
  rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].innerText;
    const cellB = b.cells[columnIndex].innerText;

    if (isNumericColumn) {
      return newOrder === 'asc' ? parseFloat(cellA) - parseFloat(cellB) : parseFloat(cellB) - parseFloat(cellA); // Toggle between ascending and descending
    } else {
      return newOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA); // Toggle between ascending and descending for text
    }
  });

  // Reattach sorted rows to the table
  rows.forEach(row => table.appendChild(row));

  // Update the header arrow direction
  updateHeaderArrow(columnIndex, newOrder);
}

// Function to update the arrow direction in the header
function updateHeaderArrow(columnIndex, order) {
  const headers = document.querySelectorAll("#data-table th");
  
  // Reset all arrows
  headers.forEach(header => {
    header.querySelector(".arrow").classList.remove("asc", "desc");
  });

  // Update the arrow for the sorted column
  const header = headers[columnIndex];
  const arrow = header.querySelector(".arrow");
  arrow.classList.add(order); // Add the correct class (asc or desc)
}

// Call the function to load data
loadSheetData();