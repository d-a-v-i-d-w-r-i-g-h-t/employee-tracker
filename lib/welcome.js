const rainbowMessage = require('./rainbowMessage.js');

// display a formatted welcome message
function welcome() {

  console.log(rainbowMessage('Welcome to Employee Tracker!'));

}

// exports from this module to other modules    
module.exports = welcome

