//? Modular Programming:

// Modular programming is a software design technique that involves dividing a program into separate, independent modules, each responsible for a specific functionality.

// require keyword is used to import modules in Node.js and is not available in the browser.

//! Importing Module

// Method: 1
const math = require('./math.js');
console.log(math.addFn(2, 3));
console.log(math.subFn(8, 2));

// Method: 2 (Destructuring)

const {addFn, subFn} = require('./math.js');
console.log(addFn(2, 3));
console.log(subFn(8, 2));

