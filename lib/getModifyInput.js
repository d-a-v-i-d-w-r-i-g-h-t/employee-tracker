const inquirer = require('inquirer');
const mysqlQuery = require('./mysqlQuery');

// get input parameters for modify query
async function getModifyInput(modifyOption) {

  // scope modifyQuestions outside of try block
  let modifyQuestions;

  try {

    // fetch all employees into an array for the choices
    // scoped outside switch block to use for multiple cases
    const employees = await mysqlQuery('all-employees');
    const employeeChoices = employees.map((employee) => `${employee['First Name']} ${employee['Last Name']}`);
    
    // switch case to select between modify options
    switch(modifyOption) {

      // MODIFY MANAGER
      case 'update-employee-manager':

        // fetch all managers into an array for the choices
        const managers = await mysqlQuery('all-employees');
        const managerChoices = managers.map((manager) => `${manager['First Name']} ${manager['Last Name']}`);
      
        // prompt for employee selection
        modifyQuestions = [
          {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to modify:',
            choices: employeeChoices
          },
          // prompt for new manager selection
          {
            type: 'list',
            name: 'newManager',
            message: (answers) => `Select a new manager for ${answers.employee}:`,
            choices: managerChoices
          },
        ];
        break;

      // MODIFY ROLE
      case 'update-employee-role':

        // Fetch all roles into an array for the choices
        const roles = await mysqlQuery('all-roles');
        const roleChoices = roles.map((roles) => roles['Job Title']);
      
        // prompt for employee selection
        modifyQuestions = [
          {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to modify:',
            choices: employeeChoices
          },
          // prompt for new job title selection
          {
            type: 'list',
            name: 'newRole',
            message: (answers) => `Select a new job title for ${answers.employee}:`,
            choices: roleChoices
          }
        ];
        break;

      // error handling - default case
      default:
        console.error('Invalid modify option');
        throw new Error('Invalid modify option');
      }

    // error handling
  } catch (error) {
  console.error('Error:', error);
  }

  try {

    // use inquirer to ask questions, return data
    const response = await inquirer.prompt(modifyQuestions);

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
module.exports = getModifyInput