const inquirer = require('inquirer');
const mysqlQuery = require('./mysqlQuery');


async function getDeleteInput(deleteOption) {

  // scope deleteQuestion outside of try block
  let deleteQuestion;

  try {
    
    // switch case to select between delete options
    switch(deleteOption) {

      // DELETE DEPARTMENT
      case 'delete-department':

        // fetch all departments into an array for the choices
        departments = await mysqlQuery('all-departments');
        departmentChoices = departments.map((department) => department['Department Name']);
      
        // prompt for department selection
        deleteQuestion = [
          {
            type: 'list',
            name: 'department',
            message: 'Select a department to delete:',
            choices: departmentChoices
          }
        ];
        break;

      // DELETE EMPLOYEE
      case 'delete-employee':

        // fetch all employees into an array for the choices
        const employees = await mysqlQuery('all-employees');
        const employeeChoices = employees.map((employee) => `${employee['First Name']} ${employee['Last Name']}`);
      
        // prompt for employee selection
        deleteQuestion = [
          {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to delete:',
            choices: employeeChoices
          },
        ];
        break;

      // DELETE ROLE
      case 'delete-role':

        // fetch all roles into an array for the choices
        const roles = await mysqlQuery('all-roles');
        const roleChoices = roles.map((roles) => roles['Job Title']);
      
        // prompt for job title selection
        deleteQuestion = [
          {
            type: 'list',
            name: 'role',
            message: 'Select a job title to delete:',
            choices: roleChoices
          },
        ];
        break;

      // error handling - default case
      default:
        console.error('Invalid delete option');
        throw new Error('Invalid delete option');
      }

    // error handling
  } catch (error) {
  console.error('Error:', error);
  }

  try {

    // use inquirer to ask questions, return data
    const response = await inquirer.prompt(deleteQuestion);

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
module.exports = getDeleteInput