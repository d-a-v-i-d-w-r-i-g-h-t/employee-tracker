const inquirer = require('inquirer');

// pointers to local modules
const mysqlQuery = require('./mysqlQuery');
const buildTable = require('./buildTable');
const getAddInput = require('./getAddInput');
const getModifyInput = require('./getModifyInput');
const getDeleteInput = require('./getDeleteInput');
const rainbowMessage = require('./rainbowMessage.js');
const thankYou = require('./thankYou');

// MAIN MENU OPTIONS
const mainMenuChoices = [
  { name: 'View', value: 'view' },
  { name: 'Add', value: 'add' },
  { name: 'Modify', value: 'modify' },
  { name: 'Delete', value: 'delete' },
  { name: 'Exit', value: 'exit' }
];

// VIEW MENU OPTIONS
const viewMenuChoices = [
  { name: 'Departments', value: 'all-departments' },
  { name: 'Roles', value: 'all-roles-details' },
  { name: 'Employees', value: 'all-employees-details' },
  { name: 'Go back', value: 'back' }
];

// VIEW DEPARTMENT SUB MENU OPTIONS
const viewDepartmentMenuChoices = [
  { name: 'All Departments', value: 'all-departments' },
  { name: 'Total Budget by Department', value: 'department-budget' },
  { name: 'Go back', value: 'back' }
];

// VIEW EMPLOYEE SUB MENU OPTIONS
const viewEmployeeMenuChoices = [
  { name: 'Alphabetical by Last Name', value: 'all-employees-details' },
  { name: 'Alphabetical by Department', value: 'all-employees-details-dept' },
  { name: 'Alphabetical by Manager', value: 'all-employees-details-mgr' },
  { name: 'Go back', value: 'back' }
];

// ADD MENU OPTIONS
const addMenuChoices = [
  { name: 'Add a department', value: 'add-department' },
  { name: 'Add a role', value: 'add-role' },
  { name: 'Add an employee', value: 'add-employee' },
  { name: 'Go back', value: 'back' }
];

// MODIFY MENU OPTIONS
const modifyMenuChoices = [
  { name: 'Employee role', value: 'update-employee-role' },
  { name: 'Employee manager', value: 'update-employee-manager' },
  { name: 'Go back', value: 'back' }
];

// DELETE MENU OPTIONS
const deleteMenuChoices = [
  { name: 'Department', value: 'delete-department' },
  { name: 'Employee', value: 'delete-employee' },
  { name: 'Role', value: 'delete-role' },
  { name: 'Go back', value: 'back' }
];

// MAIN MENU INQUIRER PROMPT
const mainMenuQuestion = [
  {
    type: 'list',
    name: 'activity',
    message: 'What would you like to do?',
    choices: mainMenuChoices
  },
];

// VIEW MENU INQUIRER PROMPT
const viewMenuQuestion = [
  {
    type: 'list',
    name: 'viewQuery',
    message: 'What would you like to view?',
    choices: viewMenuChoices
  },
];

// VIEW DEPARTMENT SUB MENU INQUIRER PROMPT
const viewDepartmentMenuQuestion = [
  {
    type: 'list',
    name: 'viewQuery',
    message: 'What view do you prefer?',
    choices: viewDepartmentMenuChoices
  },
];

// VIEW EMPLOYEE SUB MENU INQUIRER PROMPT
const viewEmployeeMenuQuestion = [
  {
    type: 'list',
    name: 'viewQuery',
    message: 'How would you like the employee list sorted?',
    choices: viewEmployeeMenuChoices
  },
];

// ADD MENU INQUIRER PROMPT
const addMenuQuestion = [
  {
    type: 'list',
    name: 'addTarget',
    message: 'What would you like to add?',
    choices: addMenuChoices
  },
];

// MODIFY MENU INQUIRER PROMPT
const modifyMenuQuestion = [
  {
    type: 'list',
    name: 'modifyTarget',
    message: 'What would you like to modify?',
    choices: modifyMenuChoices
  },
];

// DELETE MENU INQUIRER PROMPT
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

    // use inquirer to ask questions, return response
    const response = await inquirer.prompt(mainMenuQuestion);

    // switch case to jump to next level menu
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

      // exit (or anything else) ends the application with a thank you message
      default:
        thankYou();
        return;
        break;
    } 
    
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


// VIEW MENU
async function viewMenu() {
  
  // scope response outside of try block
  let response;

  try {

    // use inquirer to ask questions, return response
    response = await inquirer.prompt(viewMenuQuestion);

    // return to main menu
    if (response.viewQuery === 'back') {
      mainMenu();
    } else {

      // view departments sub menu
      if (response.viewQuery === 'all-departments') {

        // use inquirer to ask questions, return response
        response = await inquirer.prompt(viewDepartmentMenuQuestion);

        // return to view menu
        if (response.viewQuery === 'back') {
          viewMenu();
          return;
        }

      // view employees sub menu
      } else if (response.viewQuery === 'all-employees-details') {

        // use inquirer to ask questions, return response
        response = await inquirer.prompt(viewEmployeeMenuQuestion);

        // return to view menu
        if (response.viewQuery === 'back') {
          viewMenu();
          return;
        }
      }

      try {

        // send the query designator to the mysqlQuery module, return data
        const data = await mysqlQuery(response.viewQuery);

        // send the data to the buildTable module
        buildTable(data);

        // return to main menu
        mainMenu();

        // error handling
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // error handling
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

    // use inquirer to ask questions, return response
    const response = await inquirer.prompt(addMenuQuestion);

    // return to main menu
    if (response.addTarget === 'back') {
      mainMenu();
    } else {

      // get input parameters for add query
      const addParams = await getAddInput(response.addTarget);
      addParamsArray = Object.values(addParams);

      try {
        // add the new thing to the table
        const resultData = await mysqlQuery(response.addTarget, addParamsArray);

        // get the resulting table data
        const resultQuery = response.addTarget.replace('add','all')+'s';
        const data = await mysqlQuery(resultQuery);

        // display the resulting table, highlighting the new item
        buildTable(data, addParamsArray);

        // output success message
        const thing = response.addTarget.replace('add-','');
        const msg = `Successfully added ${addParamsArray[0]} as new ${thing}.`;
        console.log(rainbowMessage(msg))

        // return to the main menu
        mainMenu();

        // error handling
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // error handling
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

    // use inquirer to ask questions, return response
    const response = await inquirer.prompt(modifyMenuQuestion);

    // return to main menu
    if (response.modifyTarget === 'back') {
      mainMenu();
    } else {

      // get input parameters for modify query
      const addParams = await getModifyInput(response.modifyTarget);
      // reverse the order because we need the employee second in the query prepared statement
      modifyParamsArray = Object.values(addParams).reverse();

      try {
        // modify the target thing in the table
        const resultData = await mysqlQuery(response.modifyTarget, modifyParamsArray);

        // output success message
        const thing = response.modifyTarget.replace('update-employee-','');
        const msg = `Successfully assigned ${modifyParamsArray[0]} as new ${thing} for ${modifyParamsArray[1]}.`;
        console.log(rainbowMessage(msg))
                
        // return to the main menu
        mainMenu();

        // error handling
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // error handling
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

    // use inquirer to ask questions, return response
    const response = await inquirer.prompt(deleteMenuQuestion);

    // return to main menu
    if (response.deleteTarget === 'back') {
      mainMenu();
    } else {

      // get input parameters for delete query
      const deleteParams = await getDeleteInput(response.deleteTarget);
      deleteParamsArray = Object.values(deleteParams);

      try {
        // delete the target thing in the table
        const resultData = await mysqlQuery(response.deleteTarget, deleteParamsArray);

        // output success message
        const thing = response.deleteTarget.replace('delete-','');
        const msg = `Successfully deleted ${thing} ${deleteParamsArray[0]}.`;
        console.log(rainbowMessage(msg))
        
        // return to the main menu
        mainMenu();

        // error handling
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // error handling
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
