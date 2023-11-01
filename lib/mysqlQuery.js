const mysql = require("mysql2");



function mysqlQuery(queryOption, callback) {

  // Connect to database
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db'
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return callback(err, null);
    }

    // console.log('Connected to MySQL');

    let query;
    switch(queryOption) {
      case 'all-departments':
        query = 'SELECT name AS "Department Name" FROM department';
        break;

      case 'all-roles':
        // Define query for 'all-roles'
        break;

      case 'all-employees':
        // Define query for 'all-employees'
        break;

      default:
        console.error('Invalid query option');
        db.end();
        return callback('Invalid query option', null);
    }

    // console.log('query: ' + query);

    db.query(query, (queryError, results) => {
      if (queryError) {
        console.error('Error executing SELECT query:', queryError);
        db.end();
        return callback(queryError, null);
      }

      // console.log(results);
      const cleanedData = results.map((row) => {
        const keys = Object.keys(row);
        const mappedRow = {};
        keys.forEach((key) => {
          mappedRow[key] = row[key];
        });
        return mappedRow;
      });
      
      db.end((endError) => {
        if (endError) {
          console.error('Error closing connection:', endError);
          return callback(endError, null);
        }
        // console.log('Connection closed');
        // console.log('cleanedData:');
        // console.log(cleanedData);
        return callback(null, cleanedData);
      });
    });
  });
}


// exports from this module to other modules    
module.exports = mysqlQuery
