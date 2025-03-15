
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
    //filterTruppenTable(result);
  });