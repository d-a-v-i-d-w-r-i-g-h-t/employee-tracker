const Table = require('cli-table');
const chalk = require('chalk');


function buildTable(data, optionalParams) {


  // get column headers
  const columnHeaders = Object.keys(data[0]);

  // get the number of columns
  const numberOfColumns = columnHeaders.length;

  // find max length of each column, add buffer
  let maxLength = new Array(numberOfColumns).fill(0);
  let aligns = new Array(numberOfColumns).fill('left');

  for (let i = 0; i < numberOfColumns; i++) {
    // right-align salary column
    if (columnHeaders[i] === 'Salary' || columnHeaders[i] === 'Total Budget') {
      aligns[i] = 'right';
    }
    for (let j = 0; j < data.length; j++) {
      const valueLength = String(data[j][columnHeaders[i]] || 'N/A').length;
      maxLength[i] = Math.max(maxLength[i], valueLength);
    }
    // check header length as well
    maxLength[i] = Math.max(maxLength[i], columnHeaders[i].length);

    maxLength[i] += 3; // add some margin
  }
// console.log(maxLength);

  // Create a CLI table
  const table = new Table({
    head: columnHeaders,
    colWidths: maxLength,
    colAligns: aligns
  });

  // Push data into the table
  data.forEach((row) => {
    const rowData = columnHeaders.map((header) => row[header] || 'N/A');
    table.push(rowData);
  });

  let tableString = '\n' + table.toString() + '\n';

  // add color to optional parameters
  const rgbColor = [3, 119, 252];
  if (optionalParams) {
    for (let i = 0; i < optionalParams.length; i++) {
      tableString = tableString.replace(optionalParams[i],chalk.rgb(...rgbColor).bold(optionalParams[i]));
    }
  }
  
  // Display the table
  console.log(tableString);
}


// exports from this module to other modules    
module.exports = buildTable
