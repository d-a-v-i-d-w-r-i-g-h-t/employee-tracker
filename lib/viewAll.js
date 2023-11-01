const mysql = require("mysql2");
const Table = require('cli-table');


function viewAll(table) {

  // Connect to database
  const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the database.`)
  );

  // Connect to the MySQL server
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }

    console.log('Connected to MySQL');



    // Perform a SELECT query to retrieve data from the table
    db.query(`SELECT * FROM ${table}`, (queryError, results) => {
      if (queryError) {
        console.error('Error executing SELECT query:', queryError);
        return;
      }

      // Output the results
      console.log('Table Contents:');

      if(results){
        console.log(results);
        console.log("");
        results.forEach(function(result){
          console.log(result)
        })
      }

      // Transform the TextRows into a simpler format (array of plain objects)
      const cleanedData = results.map((row) => {
      return {
        id: row.id,
        name: row.name,
        // Add more properties as needed
        };
      });

      console.log(cleanedData);

      // find max length of name column
      let maxLength = 0;

      for (let i = 0; i < data.length; i++) {
        const nameLength = data[i].name.length;
        maxLength = Math.max(maxLength, nameLength);
      }


      // Create a CLI table
      const table = new Table({
        head: ['ID', 'Name'],
        colWidths: [5, 20],
      });

      // Push data into the table
      cleanedData.forEach((row) => {
        table.push([row.id, row.name]);
      });

      // Display the table
      console.log(table.toString());
        
    });

    // Close the connection
    db.end((endError) => {
      if (endError) {
        console.error('Error closing connection:', endError);
      } else {
        console.log('Connection closed');
      }
    });
  });
  
    
  
}

// exports from this module to other modules    
module.exports = viewAll
