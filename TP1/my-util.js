// my-util.js

// Export then Import
// Export: using legacy NodeJs specific syntax
function sayHello(name) {
  return 'Hello, ${name}!';
}
module.exports = { sayHello };

// Export: using newer standard
export function sayBye(name) {
  return 'Bye, ${name}!';
}

// Scenario 1: simplest answer
function addition(x, y) {
  console.log('call myExportedFunc', {x, y});
  return x+y;
}
module.exports = addition;

// Scenario 2: Export multiple named symbols
export function soustraction(x, y) {
  console.log('Call soustraction', {x, y});
  return x-y;
}
module.exports = { soustraction };

// What are "Node.js Modules" compared to "ECMAScript Modules"?
// Node.js Modules (CommonJS Modules):
//
// Introduction: Node.js has its own module system based on CommonJS. This was the default module system in Node.js before ECMAScript Modules (ES Modules) were introduced.

// Example
// math.js
module.exports.add = (a, b) => a + b;
// app.js
const math = require('./math');
console.log(math.add(2, 3)); // Outputs: 5

// ECMAScript Modules (ES Modules):
// Introduction: Introduced in ECMAScript 2015 (ES6), these are the standardized module system for JavaScript, now supported natively in modern browsers and Node.js.

// math.js
export const add = (a, b) => a + b;

// app.js
import { add } from './math.js';
console.log(add(2, 3)); // Outputs: 5

