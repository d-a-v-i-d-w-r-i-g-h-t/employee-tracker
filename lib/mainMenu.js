// const chalk = require('chalk');
// const rainbowColors = require('./rainbowColors.js');

const inquirer = require('inquirer');


// an array of questions for user input
const mainMenuChoices = [
  { name: 'View data', value: 'view' },
  { name: 'Add data', value: 'add' },
  { name: 'Modify data', value: 'modify' }
];
const viewMenuChoices = [
  { name: 'Departments', value: 'viewDepartments' },
  { name: 'Roles', value: 'viewRoles' },
  { name: 'Employees', value: 'viewEmployees' }
];
const addMenuChoices = [
  { name: 'Add a department', value: 'addDepartment' },
  { name: 'Add a role', value: 'addRole' },
  { name: 'Add an employee', value: 'addEmployee' }
];
const modifyMenuChoices = [
  { name: 'Update an employee', value: 'updateEmployee' }
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
    name: 'view',
    message:'\n' + 'What would you like to view?' + '\n',
    choices: viewMenuChoices
  },
];
const addMenuQuestion = [
  {
    type: 'list',
    name: 'add',
    message:'\n' + 'What would you like to add?' + '\n',
    choices: addMenuChoices
  },
];
const modifyMenuQuestion = [
  {
    type: 'list',
    name: 'modify',
    message:'\n' + 'What would you like to modify?' + '\n',
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
        console.log('view');
        // viewMenu();
        break;

      case 'add':
        console.log('add');
        // addMenu();
        break;

      case 'modify':
        console.log('modify');
        // modifyMenu();
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

    return {
      activity: response.activity
    };
    
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
