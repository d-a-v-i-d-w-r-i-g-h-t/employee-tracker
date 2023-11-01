// const chalk = require('chalk');
// const rainbowColors = require('./rainbowColors.js');
const inquirer = require('inquirer');
const mysqlQuery = require('./mysqlQuery');
const buildTable = require('./buildTable');
const getAddInput = require('./getAddInput');
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
  { name: 'Roles', value: 'all-roles-details' },
  { name: 'Employees', value: 'all-employees-details' },
  { name: 'Go back', value: 'back' }
];
const addMenuChoices = [
  { name: 'Add a department', value: 'add-department' },
  { name: 'Add a role', value: 'add-role' },
  { name: 'Add an employee', value: 'add-employee' },
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
        viewMenu();
        break;

      case 'add':
        addMenu();
        break;

        case 'modify':
          console.log('modify');
          // modifyMenu();
          break;
  
        case 'exit':
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
    // console.log(response.viewQuery);
    if (response.viewQuery === 'back') {

      mainMenu();

    } else {
      try {
        const data = await mysqlQuery(response.viewQuery);
        buildTable(data);
        mainMenu();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  } catch (error) {
    console.error('Error occurred: ', error);
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
    throw error;
  }
}


// Add Menu
async function addMenu() {
  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(addMenuQuestion);
    // console.log(response.addTarget);
    if (response.addTarget === 'back') {

      mainMenu();

    } else {

      const addParams = await getAddInput(response.addTarget);
      addParamsArray = Object.values(addParams);

      console.log(response.addTarget);
      console.log(addParamsArray);
      try {
        // add the new thing to the table
        const resultData = await mysqlQuery(response.addTarget, addParamsArray);
        // get the resulting table
        const resultQuery = response.addTarget.replace('add','all')+'s';
        const data = await mysqlQuery(resultQuery);
        // display the resulting table
        buildTable(data, addParamsArray);
        // return to the main menu
        mainMenu();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  } catch (error) {
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
