const mysql = require("mysql2");

const welcome = require('./lib/welcome.js');
const mainMenu = require("./lib/mainMenu.js");

function main() {

  welcome();

  mainMenu();

}



main();