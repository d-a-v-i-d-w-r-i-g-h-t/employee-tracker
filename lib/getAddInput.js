const inquirer = require('inquirer');
const mysqlQuery = require('./mysqlQuery');


async function getAddInput(addOption) {
  // console.log("add option: ", addOption);

  let inputQuestions;

  try {

    let departments;

    switch(addOption) {

      case 'add-department':

        // console.log('add department');
        inputQuestions = [
          {
            type: 'input',
            name: 'newDepartment',
            message:'Enter the new department name:',
            validate: function (input) {
              // Convert to string, trim spaces, and check if the result is not empty
              const trimmedInput = String(input).trim();
              return trimmedInput !== '' || 'Please enter a valid department name.';
            }
          }
        ];
        break;

      case 'add-role':
        console.log('add role');

        // Fetch departments for the choices
        departments = await mysqlQuery('all-departments');
        departmentChoices = departments.map((department) => department['Department Name']);
        console.log(departments);
        console.log(departmentChoices);

        
        inputQuestions = [
          {
            type: 'input',
            name: 'newRole',
            message:'Enter the new job title:',
            validate: function (input) {
              // Convert to string, trim spaces, and check if the result is not empty
              const trimmedInput = String(input).trim();
              return trimmedInput !== '' || 'Please enter a valid job title.';
            }
          },
            {
            type: 'input',
            name: 'newSalary',
            message:'Enter the new job salary:',
            validate: function (input) {
              const numberValue = parseFloat(input);
        
              // Check if it's a valid number and greater than or equal to 0
              if (!isNaN(numberValue) && numberValue >= 0) {
                return true;
              }
              return 'Please enter a valid salary greater than or equal to 0.';
            }
          },
          {
            type: 'list',
            name: 'department',
            message:'Select a department for the new role:',
            choices: departmentChoices
          }
        ];
        break;


      case 'add-employee':
        console.log('add employee');

        // Fetch roles and managers for the choices
        const roles = await mysqlQuery('all-roles');
        const roleChoices = roles.map((roles) => roles['Job Title']);

        const managers = await mysqlQuery('all-managers');
        const managerChoices = managers.map((manager) => `${manager['First Name']} ${manager['Last Name']}`);

        inputQuestions = [
          {
            type: 'input',
            name: 'newFirstName',
            message:`Enter the new employee's first name:`,
            validate: function (input) {
              // Convert to string, trim spaces, and check if the result is not empty
              const trimmedInput = String(input).trim();
              return trimmedInput !== '' || 'Please enter a valid first name.';
            }
          },
          {
            type: 'input',
            name: 'newLastName',
            message:`Enter the new employee's last name:`,
          },
          {
            type: 'list',
            name: 'newRole',
            message:'Select a job title for the new employee:',
            choices: roleChoices
          },
          {
            type: 'list',
            name: 'newManager',
            message:'Select a manager for the new employee:',
            choices: managerChoices
          }
        ];
        break;

      default:
        console.error('Invalid add option');
        throw new Error('Invalid add option');
      }

  } catch (error) {
  console.error('Error:', error);
  }

  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(inputQuestions);

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
module.exports = getAddInput