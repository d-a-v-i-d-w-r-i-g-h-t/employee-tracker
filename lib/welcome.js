const chalk = require('chalk');
const rainbowMessage = require('./rainbowMessage.js');

function welcome() {
  
  console.log(rainbowMessage('Welcome!'));

}

// exports from this module to other modules    
module.exports = welcome

