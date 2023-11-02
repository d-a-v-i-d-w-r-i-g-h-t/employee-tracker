const chalk = require('chalk');
const rainbowColors = require('./rainbowColors.js');

// display colorful message by formatting the text argument
function rainbowMessage(message) {

  // format message
  let colorMessage = '';

  // each character gets the next color value, color value wraps when necessary
  for (let i = 0; i < message.length; i++) {
    colorMessage += chalk.hex(rainbowColors[i % rainbowColors.length]).bold(message[i]);
  }

  // add left and right margin
  const xMargin = '   ';

  // add top and bottom margin
  let yMargin = '';
  for (let i = 0; i < message.length + 6; i++) {
    yMargin += ' ';
  }
  const newLine = '\n';
  yMargin = newLine + yMargin + newLine;
  
  // put it all together
  colorMessage = yMargin + xMargin + colorMessage + xMargin + yMargin;

  // add the black background
  return chalk.bgBlack(colorMessage);
}

// exports from this module to other modules    
module.exports = rainbowMessage
