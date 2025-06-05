
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzHfg-9tKkrE6-3IAbJ1bjAbXU77atIFGZAUMeicUDCajnOgcrCG5PO6jTJtmteCewUgQ/exec"; // Replace with your actual URL


async function loadSheetData(container) {
  const range = container.dataset.range || "A1:Z100";
  const timestamp = Date.now(); // Unique per request

  const url = `${WEB_APP_URL}?range=${encodeURIComponent(range)}&t=${timestamp}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Response not OK");

    const data = await response.json();
    displayTable(data, container);
  } catch (error) {
    console.error("Error loading data:", error);
    container.innerHTML = "<p>Unable to load data.</p>";
  }
}


// Google Sheets API connection
/*
const API_KEY = "AIzaSyD8rfdaN1J-Kt3xx9t5DPz_CNEzVOlY1j0"; // Replace with your API Key
const SPREADSHEET_ID = "1un5DNaQi0TkKvEWdzyIGXXKq1IOnLCAp4e_iC6RlsAk"; // Extract the ID from your Google Sheets URL

async function loadSheetData(container) {
  const range = container.dataset.range; // Get range from the element attribute
  if (!range) {
    console.error("No data-range specified for", container);
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayTable(data.values, container);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
*/
//-----------------

function displayTable(data, container) {
  if (!data || data.length === 0) {
    container.innerHTML = "<p>No data available.</p>";
    return;
  }

  const numericColumns = container.dataset.sortNumeric 
    ? container.dataset.sortNumeric.split(",").map(Number) 
    : [];
  const ignoreColumns = container.dataset.ignore 
    ? container.dataset.ignore.split(",").map(Number) 
    : [];

  const table = document.createElement("table");
  table.classList.add("md-typeset__table");
  table.style = "padding:0px";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  data[0].forEach((header, index) => {
    if (!ignoreColumns.includes(index)) {
      const th = document.createElement("th");
      th.textContent = header;

      if (numericColumns.includes(index)) {
        th.setAttribute("data-sort-method", "number");
      }

      headRow.appendChild(th);
    }
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.slice(1).filter(row => row.some(cell => cell.trim() !== "")).forEach(row => {
    const tr = document.createElement("tr");

    row.forEach((cell, index) => {
      if (!ignoreColumns.includes(index)) {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      }
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  // Create a scrollable wrapper for the table
  const wrapper = document.createElement("div");
  wrapper.classList.add("table-container");
  wrapper.appendChild(table);

  container.innerHTML = "";
  container.appendChild(wrapper);

  if (typeof Tablesort !== "undefined") {
    new Tablesort(table);
  }
}


//-----------------

// Load tables on page load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sheet-container").forEach(loadSheetData);
});

setInterval(() => {
  document.querySelectorAll(".sheet-container").forEach(loadSheetData);
}, 2 * 60 * 1000); // every 1 minutes