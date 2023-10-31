const mysql = require("mysql2");

const welcome = require('./lib/welcome.js');
const userInput = require('./lib/userInput.js');
const mainMenu = require("./lib/mainMenu.js");

function main() {

  welcome();

  mainMenu();

}



main();