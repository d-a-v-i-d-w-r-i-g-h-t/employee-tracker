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

      // BUDGET BY DEPARTMENT
      case 'department-budget':
        query = `
          SELECT
            department.name AS 'Department',
            SUM(role.salary) AS 'Total Budget'
          FROM
            department
          JOIN
            role ON department.id = role.department_id
          JOIN
            employee ON role.id = employee.role_id
          GROUP BY
            department.name;
        `;
        break;

      // ALL DEPARTMENTS
      case 'all-departments':
        query = `
          SELECT
            name AS 'Department Name'
          FROM
            department
          ORDER BY
            department.name ASC;
          `;
        break;

      // ALL EMPLOYEES
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

      // ALL EMPLOYEE DETAILS
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
          LEFT JOIN
            role ON employee.role_id = role.id
          LEFT JOIN
            department ON role.department_id = department.id 
          LEFT JOIN
            employee AS manager ON employee.manager_id = manager.id
          ORDER BY
            employee.last_name ASC,
            employee.first_name ASC;
          `;
        break;

      // ALL EMPLOYEES DETAILS BY DEPARTMENT
      case 'all-employees-details-dept':
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
      LEFT JOIN
        role ON employee.role_id = role.id
      LEFT JOIN
        department ON role.department_id = department.id
      LEFT JOIN
        employee AS manager ON employee.manager_id = manager.id
      ORDER BY
        department.name ASC,
        employee.last_name ASC,
        employee.first_name ASC;
      `;
        break;

      // ALL EMPLOYEES DETAILS BY MANAGER
      case 'all-employees-details-mgr':
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
      LEFT JOIN
        role ON employee.role_id = role.id
      LEFT JOIN
        department ON role.department_id = department.id
      LEFT JOIN
        employee AS manager ON employee.manager_id = manager.id
      ORDER BY
        manager.last_name ASC,
        manager.first_name ASC,
        employee.last_name ASC,
        employee.first_name ASC;
      `;
        break;

      // ALL ROLES
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

      // ALL ROLES DETAILS
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
          role.title ASC;
          `;
        break;

      // ADD DEPARTMENT
      case 'add-department':
        query = `
          INSERT INTO
            department (name)
          VALUES
            (?)
          `;
        break;

      // ADD EMPLOYEE
      case 'add-employee':
        query = `
          INSERT INTO
            employee (first_name, last_name, role_id, manager_id)
          SELECT
            ? AS first_name,
            ? AS last_name,
            role.id AS role_id,
            manager.id AS manager_id
          FROM
            role
          JOIN
            employee AS manager ON CONCAT(manager.first_name, ' ', manager.last_name) = ?
          WHERE
            title = ?;
          `;
        break;

      // ADD ROLE
      case 'add-role':
        query = `
          INSERT INTO
            role (title, salary, department_id)
          SELECT
            ?,
            ?,
            id
          FROM
            department
          WHERE
            name = ?;
          `;
        break;

      // MODIFY EMPLOYEE MANAGER
      case 'update-employee-manager':
        query = `
          UPDATE employee
          SET manager_id = (
            SELECT id 
            FROM (SELECT * FROM employee) AS emp
            WHERE CONCAT(emp.first_name, ' ', emp.last_name) = ?
          )
          WHERE CONCAT(first_name, ' ', last_name) = ?;
        `;
        break;

      // MODIFY EMPLOYEE ROLE
      case 'update-employee-role':
        query = `
          UPDATE employee
          SET role_id = (SELECT id FROM role WHERE title = ?)
          WHERE CONCAT(first_name, ' ', last_name) = ?;
          `;
        break;

      // DELETE DEPARTMENT
      case 'delete-department':
        query = `
          DELETE FROM department
          WHERE name = ?;
          `;
        break;

      // DELETE EMPLOYEE
      case 'delete-employee':
        query = `
          DELETE FROM employee
          WHERE CONCAT(first_name, ' ', last_name) = ?;
          `;
        break;

      // DELETE ROLE
      case 'delete-role':
        query = `
          DELETE FROM role
          WHERE title = ?;
          `;
        break;

      default:
        console.error('Invalid query option');
        return Promise.reject('Invalid query option');
    }

    let results = [];
    let addResults;
    // console.log('query: ' + query);
    if (optionalParams) {
      [addResults] = await connection.query(query, optionalParams);
      // console.log(addResults);
    } else {
      [results] = await connection.query(query);
      // console.log(results);
    }
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
