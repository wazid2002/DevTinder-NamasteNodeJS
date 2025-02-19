/*-NodeJS allows Modules to split code into reusable files.
  -require function and module.exports helps in importing and exporting files
        ~module.exports is used to export functions and variables from module so that they can be used in other files.
        ~require is used to import a module snd access the exported values*/


// for requiring a single variable or function

// const add = require("./math");
// console.log(add(5,7))

//for requiring multiple variables or functions from different file

const {add,subtract}= require("./math") // object Destructuring
