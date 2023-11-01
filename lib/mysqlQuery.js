const mysql = require("mysql2/promise");



async function mysqlQuery(queryOption, optionalParams) {
  try {
    // Connect to database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_tracker_db'
    });

    // console.log('Connected to MySQL');

    let query;
    switch(queryOption) {
      case 'all-departments':
        query = `
          SELECT
            name AS 'Department Name'
          FROM
            department
          ORDER BY
            name ASC;
          `;
        break;

      case 'all-roles':
        query = `
          SELECT
            title AS 'Job Title'
          FROM
            role
          ORDER BY
            title ASC;
          `;
        break;

      case 'all-roles-details':
        query = `
          SELECT
            role.title AS 'Job Title',
            role.salary AS 'Salary',
            department.name AS 'Department'
          FROM
            role
          JOIN
            department ON role.department_id = department.id
          GROUP BY
            department.id, role.title, role.salary, department.name
          ORDER BY
            department.name ASC, role.salary DESC;
          `;
        break;

      case 'all-employees':
        query = `
          SELECT
            first_name AS 'First Name',
            last_name AS 'Last Name'
          FROM
            employee
          ORDER BY
            last_name ASC, first_name ASC;
          `;
        break;

      case 'all-employees-details':
        query = `
          SELECT
            employee.first_name AS 'First Name',
            employee.last_name AS 'Last Name',
            role.title AS 'Job Title',
            role.salary AS 'Salary',
            department.name AS 'Department',
            manager.first_name AS 'Manager First Name',
            manager.last_name AS 'Manager Last Name'
          FROM
            employee
          JOIN
            role ON employee.role_id = role.id
          JOIN
            department ON role.department_id = department.id
          LEFT JOIN
            employee AS manager ON employee.manager_id = manager.id
          ORDER BY
            employee.last_name ASC,
            employee.first_name ASC;
          `;
        break;

      default:
        console.error('Invalid query option');
        return Promise.reject('Invalid query option');
    }

    // console.log('query: ' + query);

    const [results] = await connection.query(query);

    // Clean up the data
    const cleanedData = results.map((row) => ({ ...row }));

    // Close the connection
    await connection.end();

    // console.log('Connection closed');
    return cleanedData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
      

// exports from this module to other modules    
module.exports = mysqlQuery
