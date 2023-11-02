const rainbowMessage = require('./rainbowMessage.js');

// display a formatted thank you message
function thankYou() {

  console.log(rainbowMessage('Thank you for using Employee Tracker!'));

}

// exports from this module to other modules    
module.exports = thankYou

