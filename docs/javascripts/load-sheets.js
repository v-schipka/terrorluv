// Google Sheets API connection
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

//-----------------

function displayTable(data, container) {
  if (!data || data.length === 0) {
    container.innerHTML = "<p>No data available.</p>";
    return;
  }

  // Get numeric and ignored column indexes safely
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

      // Add the required sorting attribute
      if (numericColumns.includes(index)) {
        th.setAttribute("data-sort-method", "number");
      }

      headRow.appendChild(th);
    }
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.slice(1).forEach(row => {
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

  //const wrapper = document.createElement("div");
  //wrapper.classList.add("md-table");
 // wrapper.appendChild(table);

  container.innerHTML = "";
  container.appendChild(table);

  // Reinitialize Tablesort to recognize new table
  if (typeof Tablesort !== "undefined") {
    new Tablesort(table);
  }
}

//-----------------

// Load tables on page load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sheet-container").forEach(loadSheetData);
});

