const chalk = require('chalk');
const rainbowColors = require('./rainbowColors.js');

// display colorful  message
function rainbowMessage(message) {

  // format message
  let colorMessage = '';

  for (let i = 0; i < message.length; i++) {
    colorMessage += chalk.hex(rainbowColors[i % rainbowColors.length]).bold(message[i]);
  }

  const xMargin = '   ';

  let yMargin = '';
  for (let i = 0; i < message.length + 6; i++) {
    yMargin += ' ';
  }
  const newLine = '\n';
  yMargin = newLine + yMargin + newLine;
  
  colorMessage = yMargin + xMargin + colorMessage + xMargin + yMargin;

  return chalk.bgBlack(colorMessage);
}

// exports from this module to other modules    
module.exports = rainbowMessage
