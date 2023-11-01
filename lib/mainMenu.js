// const chalk = require('chalk');
// const rainbowColors = require('./rainbowColors.js');

const inquirer = require('inquirer');
const viewAll = require('./viewAll');
const thankYou = require('./thankYou');


// an array of questions for user input
const mainMenuChoices = [
  { name: 'View data', value: 'view' },
  { name: 'Add data', value: 'add' },
  { name: 'Modify data', value: 'modify' },
  { name: 'Exit', value: 'exit' }
];
const viewMenuChoices = [
  { name: 'Departments', value: 'all-departments' },
  { name: 'Roles', value: 'all-roles' },
  { name: 'Employees', value: 'all-employees' },
  { name: 'Go back', value: 'back' }
];
const addMenuChoices = [
  { name: 'Add a department', value: 'addDepartment' },
  { name: 'Add a role', value: 'addRole' },
  { name: 'Add an employee', value: 'addEmployee' },
  { name: 'Go back', value: 'back' }
];
const modifyMenuChoices = [
  { name: 'Update an employee', value: 'updateEmployee' },
  { name: 'Go back', value: 'back' }
];


const mainMenuQuestion = [
  {
    type: 'list',
    name: 'activity',
    // message:'\n' + '\n' + 'What would you like to do?',
    message:'What would you like to do?',
    choices: mainMenuChoices
  },
];
const viewMenuQuestion = [
  {
    type: 'list',
    name: 'viewQuery',
    message:'What would you like to view?',
    choices: viewMenuChoices
  },
];
const addMenuQuestion = [
  {
    type: 'list',
    name: 'addTarget',
    message:'What would you like to add?',
    choices: addMenuChoices
  },
];
const modifyMenuQuestion = [
  {
    type: 'list',
    name: 'modifyTarget',
    message:'What would you like to modify?',
    choices: modifyMenuChoices
  },
];


// Main Menu
async function mainMenu() {
  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(mainMenuQuestion);

    switch (response.activity) {

      case 'view':
        // console.log('view');
        viewMenu();
        break;

      case 'add':
        console.log('add');
        // addMenu();
        break;

        case 'modify':
          console.log('modify');
          // modifyMenu();
          break;
  
        case 'exit':
          console.log('exit');

          thankYou();
          return;
          break;
    } 
    
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

// View Menu
async function viewMenu() {
  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(viewMenuQuestion);
    console.log(response.viewQuery);
    if (response.viewQuery === 'back') {

      mainMenu();

    } else {

      viewAll(response.viewQuery);

    }
      // case 'viewDepartments':
      //   console.log('viewDepartments');
      //   // viewMenu();
      //   break;

      // case 'viewRoles':
      //   console.log('viewRoles');
      //   // addMenu();
      //   break;

      // case 'viewEmployees':
      //   console.log('viewEmployees');
      //   // modifyMenu();
      //   break;
      // } 
    
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
module.exports = mainMenu
