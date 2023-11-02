const inquirer = require('inquirer');
const mysqlQuery = require('./mysqlQuery');

// get input parameters for add query
async function getAddInput(addOption) {

  // scope addQuestions outside of try block
  let addQuestions;

  try {

    // scope departments outside of switch block
    let departments;


    // switch case to select between add options
    switch(addOption) {


      // ADD DEPARTMENT
      case 'add-department':

        // prompt for new department name, validate input
        addQuestions = [
          {
            type: 'input',
            name: 'newDepartment',
            message: 'Enter the new department name:',
            validate: function (input) {
              // Convert to string, trim spaces, and check if the result is not empty
              const trimmedInput = String(input).trim();
              return trimmedInput !== '' || 'Please enter a valid department name.';
            }
          }
        ];
        break;


      // ADD ROLE
      case 'add-role':

        // fetch all departments into an array for the choices
        departments = await mysqlQuery('all-departments');
        departmentChoices = departments.map((department) => department['Department Name']);

        // prompt for new job title, validate input
        addQuestions = [
          {
            type: 'input',
            name: 'newRole',
            message: 'Enter the new job title:',
            validate: function (input) {
              // Convert to string, trim spaces, and check if the result is not empty
              const trimmedInput = String(input).trim();
              return trimmedInput !== '' || 'Please enter a valid job title.';
            }
          },
          // prompt for new salary, validate input >= 0
          {
            type: 'input',
            name: 'newSalary',
            message: (answers) => `Enter the salary for the new role of ${answers.newRole}:`,
            validate: function (input) {
              const numberValue = parseFloat(input);
        
              // Check if it's a valid number and greater than or equal to 0
              if (!isNaN(numberValue) && numberValue >= 0) {
                return true;
              }
              return 'Please enter a valid salary greater than or equal to 0.';
            }
          },
          // prompt for department selection
          {
            type: 'list',
            name: 'department',
            message: (answers) => `Select a department for the new role of ${answers.newRole}:`,
            choices: departmentChoices
          }
        ];
        break;


      // ADD EMPLOYEE
      case 'add-employee':

        // fetch all roles into an array for the choices
        const roles = await mysqlQuery('all-roles');
        const roleChoices = roles.map((roles) => roles['Job Title']);

        // fetch all managers (i.e. all employees -- anyone can be a manager) into an array for the choices
        const managers = await mysqlQuery('all-employees');
        const managerChoices = managers.map((manager) => `${manager['First Name']} ${manager['Last Name']}`);

        // prompt for new employee first name, validate input
        addQuestions = [
          {
            type: 'input',
            name: 'newFirstName',
            message: `Enter the new employee's first name:`,
            validate: function (input) {
              // Convert to string, trim spaces, and check if the result is not empty
              const trimmedInput = String(input).trim();
              return trimmedInput !== '' || 'Please enter a valid first name.';
            }
          },
          // prompt for new employee last name; no validation, can be blank
          {
            type: 'input',
            name: 'newLastName',
            message: `Enter the new employee's last name:`,
          },
          // prompt for manager selection
          {
            type: 'list',
            name: 'newManager',
            message: (answers) => `Select a manager for ${answers.newFirstName} ${answers.newLastName}:`,
            choices: managerChoices
          },
          // prompt for job title selection
          {
            type: 'list',
            name: 'newRole',
            message: (answers) => `Select a job title for ${answers.newFirstName} ${answers.newLastName}:`,
            choices: roleChoices
          }
        ];
        break;

      // error handling - default case
      default:
        console.error('Invalid add option');
        throw new Error('Invalid add option');
      }

    // error handling
  } catch (error) {
  console.error('Error:', error);
  }

  try {

    // use inquirer to ask questions, return data
    const response = await inquirer.prompt(addQuestions);

    return response;

    // error handling
  } catch(error) {
    console.error('Error occurred: ', error);
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
    } else {
        console.log("Something else went wrong");
    }
    throw error;
  }
}


// exports from this module to other modules    
module.exports = getAddInput