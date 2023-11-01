const Table = require('cli-table');

function buildTable(data) {


  // get column headers
  const columnHeaders = Object.keys(data[0]);

  // get the number of columns
  const numberOfColumns = columnHeaders.length;

  // if (customHeaders && customHeaders.length === numberOfColumns) {
  //   columnHeaders = customHeaders; // use custom headers if provided
  // }

  // find max length of each column, add buffer
  let maxLength = new Array(numberOfColumns).fill(0);

  for (let i = 0; i < numberOfColumns; i++) {
    for (let j = 0; j < data.length; j++) {
      const valueLength = Object.values(data[j])[i].toString().length;
      maxLength[i] = Math.max(maxLength[i], valueLength);
    }
    // check header length as well
    maxLength[i] = Math.max(maxLength[i], columnHeaders[i].toString().length);

    maxLength[i] += 4; // add some margin
  }


  // Create a CLI table
  const table = new Table({
    // head: ['ID', 'Name'],
    head: columnHeaders,
    // colWidths: [5, 20],
    colWidths: maxLength,
  });

  // Push data into the table
  data.forEach((row) => {
    table.push([row.id, row.name]);
  });

  // Display the table
  console.log(table.toString());



}


// exports from this module to other modules    
module.exports = buildTable
