const mysql = require("mysql2");



function mysqlQuery(queryOption) {

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
    
    // use a switch statement to designate different queries
    let query;
    switch(queryOption) {

      case 'all-departments':
        query = `SELECT name AS 'Department Name' FROM department`;

      break;

      case 'all-roles':


        break;

      
      case 'all-employees':


        break;
    }

    console.log('query: ' + query);

    // Perform a SELECT query to retrieve data from the table
    db.query(query, (queryError, results) => {
      if (queryError) {
        console.error('Error executing SELECT query:', queryError);
        return;
      }

      // Transform the TextRows into a simpler format (array of plain objects)
      const cleanedData = results.map((row) => {
        return {
          name: row.name,
        };
      });
        


      // Close the connection
      db.end((endError) => {
        if (endError) {
          console.error('Error closing connection:', endError);
        } else {
          console.log('Connection closed');
        }
      });

      console.log('cleanedData:');
      console.log(cleanedData);
      return cleanedData;
    });
  });
}


// exports from this module to other modules    
module.exports = mysqlQuery
