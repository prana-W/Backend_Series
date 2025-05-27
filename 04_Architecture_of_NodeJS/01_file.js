const fs = require('fs');

//! Blocking (Synchronous)
console.log(1)
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);
console.log(2)
console.log(3)


//! Non-blocking (Asynchronous)
// Callback is required as a third argument to handle the asynchronous operation.
console.log(4)
console.log(5)
fs.readFile ('./contact.txt', "utf-8", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
})
console.log(6)
console.log(7)



// Results
// Synchronous (Blocking) code will block the execution of the code until the current operation is completed.
// Asynchronous (Non-blocking) code will not block the execution of the code, allowing the program to continue running while waiting for the operation to complete.

/*


// Synchronous (Blocking)
fs.writeFileSync("./test.txt", "Hello, World! (synchronously handled operation) ");

// Asynchronous (Non-blocking)
fs.writeFile("./test2.txt", "Hello World (asynchronously handled operation)", (err) => {});



 */