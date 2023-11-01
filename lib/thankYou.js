const chalk = require('chalk');
const rainbowMessage = require('./rainbowMessage.js');

function thankYou() {

  console.log(rainbowMessage('Thank you for using Employee Tracker!'));

}

// exports from this module to other modules    
module.exports = thankYou

