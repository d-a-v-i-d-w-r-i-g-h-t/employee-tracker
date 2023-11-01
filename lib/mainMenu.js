// const chalk = require('chalk');
// const rainbowColors = require('./rainbowColors.js');
const inquirer = require('inquirer');
const mysqlQuery = require('./mysqlQuery');
const buildTable = require('./buildTable');
const getAddInput = require('./getAddInput');
const getModifyInput = require('./getModifyInput');
const getDeleteInput = require('./getDeleteInput');
const thankYou = require('./thankYou');
const rainbowMessage = require('./rainbowMessage.js');




// an array of questions for user input
const mainMenuChoices = [
  { name: 'View', value: 'view' },
  { name: 'Add', value: 'add' },
  { name: 'Modify', value: 'modify' },
  { name: 'Delete', value: 'delete' },
  { name: 'Exit', value: 'exit' }
];
const viewMenuChoices = [
  { name: 'Departments', value: 'all-departments' },
  { name: 'Roles', value: 'all-roles-details' },
  { name: 'Employees', value: 'all-employees-details' },
  { name: 'Total Budget by Department', value: 'department-budget' },
  { name: 'Go back', value: 'back' }
];
const viewEmployeeMenuChoices = [
  { name: 'Alphabetical by Last Name', value: 'all-employees-details' },
  { name: 'Alphabetical by Department', value: 'all-employees-details-dept' },
  { name: 'Alphabetical by Manager', value: 'all-employees-details-mgr' },
  { name: 'Go back', value: 'back' }
];
const addMenuChoices = [
  { name: 'Add a department', value: 'add-department' },
  { name: 'Add a role', value: 'add-role' },
  { name: 'Add an employee', value: 'add-employee' },
  { name: 'Go back', value: 'back' }
];
const modifyMenuChoices = [
  { name: 'Employee role', value: 'update-employee-role' },
  { name: 'Employee manager', value: 'update-employee-manager' },
  { name: 'Go back', value: 'back' }
];
const deleteMenuChoices = [
  { name: 'Department', value: 'delete-department' },
  { name: 'Employee', value: 'delete-employee' },
  { name: 'Role', value: 'delete-role' },
  { name: 'Go back', value: 'back' }
];


const mainMenuQuestion = [
  {
    type: 'list',
    name: 'activity',
    message: 'What would you like to do?',
    choices: mainMenuChoices
  },
];
const viewMenuQuestion = [
  {
    type: 'list',
    name: 'viewQuery',
    message: 'What would you like to view?',
    choices: viewMenuChoices
  },
];
const viewEmployeeMenuQuestion = [
  {
    type: 'list',
    name: 'viewQuery',
    message: 'How would you like the employee list sorted?',
    choices: viewEmployeeMenuChoices
  },
];
const addMenuQuestion = [
  {
    type: 'list',
    name: 'addTarget',
    message: 'What would you like to add?',
    choices: addMenuChoices
  },
];
const modifyMenuQuestion = [
  {
    type: 'list',
    name: 'modifyTarget',
    message: 'What would you like to modify?',
    choices: modifyMenuChoices
  },
];
const deleteMenuQuestion = [
  {
    type: 'list',
    name: 'deleteTarget',
    message: 'What would you like to delete?',
    choices: deleteMenuChoices
  },
];


// MAIN MENU
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
        modifyMenu();
        break;

      case 'delete':
        deleteMenu();
        break;

      default:
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


// VIEW MENU
async function viewMenu() {
  
  let response;

  try {

    // use inquire to ask questions, return data
    response = await inquirer.prompt(viewMenuQuestion);
    // console.log(response.viewQuery);
    if (response.viewQuery === 'back') {

      mainMenu();

    } else {
      if (response.viewQuery === 'all-employees-details') {
        console.log('employee sub menu');
        response = await inquirer.prompt(viewEmployeeMenuQuestion);
        if (response.viewQuery === 'back') {
          viewMenu();
          return;
        }
      }
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


// ADD MENU
async function addMenu() {
  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(addMenuQuestion);
    console.log(response.addTarget);
    if (response.addTarget === 'back') {

      mainMenu();

    } else {

      const addParams = await getAddInput(response.addTarget);
      addParamsArray = Object.values(addParams);

      try {
        // add the new thing to the table
        const resultData = await mysqlQuery(response.addTarget, addParamsArray);

        console.log(response.addTarget);
        console.log(addParamsArray);
        
        // get the resulting table
        const resultQuery = response.addTarget.replace('add','all')+'s';
        const data = await mysqlQuery(resultQuery);
        // display the resulting table
        buildTable(data, addParamsArray);

        const thing = response.addTarget.replace('add-','');
        const msg = `Successfully added ${addParamsArray[0]} as new ${thing}.`;
        console.log(rainbowMessage(msg))

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


// MODIFY MENU
async function modifyMenu() {
  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(modifyMenuQuestion);
    console.log(response.modifyTarget);

    if (response.modifyTarget === 'back') {

      mainMenu();

    } else {

      const addParams = await getModifyInput(response.modifyTarget);
      modifyParamsArray = Object.values(addParams).reverse();

      try {
        // modify the new thing in the table
        const resultData = await mysqlQuery(response.modifyTarget, modifyParamsArray);
        const thing = response.modifyTarget.replace('update-employee-','');
        const msg = `Successfully assigned ${modifyParamsArray[0]} as new ${thing} for ${modifyParamsArray[1]}.`;
        console.log(rainbowMessage(msg))
                
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


// DELETE MENU
async function deleteMenu() {
  try {

    // use inquire to ask questions, return data
    const response = await inquirer.prompt(deleteMenuQuestion);
    console.log(response.deleteTarget);
    if (response.deleteTarget === 'back') {

      mainMenu();

    } else {

      const deleteParams = await getDeleteInput(response.deleteTarget);
      deleteParamsArray = Object.values(deleteParams);

      try {
        // modify the new thing in the table
        const resultData = await mysqlQuery(response.deleteTarget, deleteParamsArray);
        const thing = response.deleteTarget.replace('delete-','');
        const msg = `Successfully deleted ${thing} ${deleteParamsArray[0]}.`;
        console.log(rainbowMessage(msg))
        
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
