const mysql = require("mysql2");
const buildTable = require('./buildTable');


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
      let headers = [];
      switch (table) {

        case 'department':
          headers = ['ID', 'Department Name'];
          break;

        case 'role':
          headers = ['ID', 'Job Title', 'Salary', 'Department'];
          break;

        case 'employee':
          headers = ['ID', 'First Name', 'Last Name', 'Job Title', 'Salary', 'Manager'];
          break;

      }

      buildTable(cleanedData, headers);

        
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
