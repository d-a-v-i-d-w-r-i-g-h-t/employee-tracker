const inquirer = require('inquirer');
const mysqlQuery = require('./mysqlQuery');


async function getDeleteInput(deleteOption) {

  let deleteQuestion;

  try {
    
    switch(deleteOption) {

      // DELETE DEPARTMENT
      case 'delete-department':

        // Fetch departments for the choices
        departments = await mysqlQuery('all-departments');
        departmentChoices = departments.map((department) => department['Department Name']);
      
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

        // Fetch employees for the choices
        const employees = await mysqlQuery('all-employees');
        const employeeChoices = employees.map((employee) => `${employee['First Name']} ${employee['Last Name']}`);
      
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

        // Fetch roles for the choices
        const roles = await mysqlQuery('all-roles');
        const roleChoices = roles.map((roles) => roles['Job Title']);
      
        deleteQuestion = [
          {
            type: 'list',
            name: 'role',
            message: 'Select a role to delete:',
            choices: roleChoices
          },
        ];
        break;

      default:
        console.error('Invalid delete option');
        throw new Error('Invalid delete option');
      }

  } catch (error) {
  console.error('Error:', error);
  }

  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(deleteQuestion);

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
module.exports = getDeleteInput