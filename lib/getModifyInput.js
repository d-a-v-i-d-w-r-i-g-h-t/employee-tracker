const inquirer = require('inquirer');
const mysqlQuery = require('./mysqlQuery');


async function getModifyInput(modifyOption) {
  // console.log("add option: ", addOption);

  let modifyQuestions;

  try {

    // Fetch employees for the choices
    const employees = await mysqlQuery('all-employees');
    const employeeChoices = employees.map((employee) => `${employee['First Name']} ${employee['Last Name']}`);
    
    switch(modifyOption) {

      // MODIFY MANAGER
      case 'update-employee-manager':

        // Fetch managers for the choices
        const managers = await mysqlQuery('all-employees');
        const managerChoices = managers.map((manager) => `${manager['First Name']} ${manager['Last Name']}`);
      
        modifyQuestions = [
          {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to modify:',
            choices: employeeChoices
          },
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

        // Fetch roles for the choices
        const roles = await mysqlQuery('all-roles');
        const roleChoices = roles.map((roles) => roles['Job Title']);
      
        modifyQuestions = [
          {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to modify:',
            choices: employeeChoices
          },
          {
            type: 'list',
            name: 'newRole',
            message: (answers) => `Select a new role for ${answers.employee}:`,
            choices: roleChoices
          }
        ];
        break;


      default:
        console.error('Invalid modify option');
        throw new Error('Invalid modify option');
      }

  } catch (error) {
  console.error('Error:', error);
  }

  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(modifyQuestions);

    return response;

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