// fs is a built-in Node.js module that provides an API for interacting with the file system.
const fs = require('fs');

// Synchronous file writing/creation

// Below creates a file named 'test.txt' in the current directory with the specified content (if not already present) and updates the content if it exists.
fs.writeFileSync ('./test.txt', 'Hello, World! This is a test file created using Node.js fs module.');

// Asynchronous file writing/creation

fs.writeFile('./test2.txt', 'Hello, World! This is a test file created using Node.js fs module by async operation.', (err) => {
    console.error(err)
})


// Synchronous File Reading
const result =  fs.readFileSync('./contacts.txt', 'utf-8')
console.log(result)

// Asynchronous File Reading
fs.readFile('./contacts.txt', 'utf-8', (err, result) => {
    if (err) {
        console.error(err);
    } else
    console.log(result);
})

//! Asynchronous File operation always takes a callback function as the last argument.

// Synchronous File Appending
fs.appendFileSync('./test3.txt', Date.now().toLocaleString()+'\n');

// Synchronous File Copying
fs.cpSync('./test3.txt', './test4.txt')

// Synchronous File Deletion
fs.unlinkSync('test.txt')

// Synchronous File Stat (to get file metadata)
console.log(fs.statSync('./test4.txt'))
console.log(fs.statSync('./test4.txt').isFile()) // true if it is a file

// Synchronous Directory Creation
fs.mkdirSync("my-docs");
fs.mkdirSync("mydocss2/a/b/c/d", { recursive: true }); // recursive option allows creating nested directories

//! Note: Error is thrown if the file or directory already exists when using synchronous methods. For asynchronous methods, the callback function will receive an error if the operation fails.