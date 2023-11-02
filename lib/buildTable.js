const Table = require('cli-table');
const chalk = require('chalk');

// display mysql data in formatted tables
function buildTable(data, optionalParams) {

  // get column headers
  const columnHeaders = Object.keys(data[0]);

  // get the number of columns
  const numberOfColumns = columnHeaders.length;

  let maxWidth = new Array(numberOfColumns).fill(0);
  // default left align
  let aligns = new Array(numberOfColumns).fill('left');

  // calculate max width to correctly size each column
  for (let i = 0; i < numberOfColumns; i++) {

    // right-align salary and total budget columns
    if (columnHeaders[i] === 'Salary' || columnHeaders[i] === 'Total Budget') {
      aligns[i] = 'right';
    }

    // step through all data in each row to find max width
    for (let j = 0; j < data.length; j++) {
      const valueLength = String(data[j][columnHeaders[i]] || 'N/A').length;
      maxWidth[i] = Math.max(maxWidth[i], valueLength);
    }

    // also check header width
    maxWidth[i] = Math.max(maxWidth[i], columnHeaders[i].length);

    maxWidth[i] += 3; // add some margin
  }

  // create a CLI table
  const table = new Table({
    head: columnHeaders,
    colWidths: maxWidth,
    colAligns: aligns
  });

  // push data into the table
  data.forEach((row) => {
    // add 'N/A' for any NULL values
    const rowData = columnHeaders.map((header) => row[header] || 'N/A');
    table.push(rowData);
  });

  // add some top and bottom margin
  let tableString = '\n' + table.toString() + '\n';

  // add color to optional parameters to highlight added data
  const rgbAzure = [28, 132, 252];
  if (optionalParams) {
    for (let i = 0; i < optionalParams.length; i++) {
      tableString = tableString.replace(optionalParams[i],chalk.rgb(...rgbAzure).bold(optionalParams[i]));
    }
  }
  
  // display the table
  console.log(tableString);
}


// exports from this module to other modules    
module.exports = buildTable
