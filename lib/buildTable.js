const Table = require('cli-table');

function buildTable(data) {


  // get column headers
  const columnHeaders = Object.keys(data[0]);

  // get the number of columns
  const numberOfColumns = columnHeaders.length;

  // find max length of each column, add buffer
  let maxLength = new Array(numberOfColumns).fill(0);

  for (let i = 0; i < numberOfColumns; i++) {
    for (let j = 0; j < data.length; j++) {
      const valueLength = String(data[j][columnHeaders[i]] || 'N/A').length;
      maxLength[i] = Math.max(maxLength[i], valueLength);
    }
    // check header length as well
    maxLength[i] = Math.max(maxLength[i], columnHeaders[i].length);

    maxLength[i] += 4; // add some margin
  }
// console.log(maxLength);

  // Create a CLI table
  const table = new Table({
    head: columnHeaders,
    colWidths: maxLength,
  });

  // Push data into the table
  data.forEach((row) => {
    const rowData = columnHeaders.map((header) => row[header] || 'N/A');
    table.push(rowData);
  });

  // Display the table
  console.log('');
  console.log(table.toString());
  console.log('');

}


// exports from this module to other modules    
module.exports = buildTable
