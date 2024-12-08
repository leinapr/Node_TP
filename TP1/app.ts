// app.js

// Export then Import
// Import: using legacy NodeJs specific syntax
const sayHello = require('./my-util.js');
sayHello.sayHello();

// Import: using newer standard
import {sayBye, soustraction} from './my-util.js';

const greeting1 = sayHello('World');
console.log(greeting1);

const greeting2 = sayBye('World');
console.log(greeting2);

// Scenario 1: simplest answer
const addition = require('./my-util.js');
console.log("Starting app.js ...");
addition(1, 2);
console.log("Finishing app.js");

// Scenario 2: export multiple named symbols
const soustraction = require('./my-util.js');
console.log("Starting app.js ...");
soustraction(1, 2);
console.log("Finishing app.js");

