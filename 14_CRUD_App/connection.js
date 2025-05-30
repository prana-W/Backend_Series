const mongoose = require('mongoose');

//! Using async-await

// returning Promise.resolve(void) as an async function.
async function connectMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log('✅ Connected to MongoDB!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Exit process on failure
    }
}

module.exports = {
    connectMongoDB
};

//! Using Promises

function connectMongoDB2(url) {
    return mongoose.connect(url)
        .then(() => {
            console.log('✅ Connected to MongoDB');
        })
        .catch((error) => {
            console.error('❌ MongoDB connection error:', error.message);
            process.exit(1);
        });
}

/*

NOTES

async function always returns a promise (promise.resolve() or promise.reject() after promise is fulfilled). If we want to pass a value along with the promise, then only we should use return (value). This returns a Promise.resolve('value'). Always use try-catch block. try block will execute first, and if any error occurs, it will be caught by the catch block.

await any promises and if error occurs it goes to catch block and then error is handled. Also we don't need to use return in try block evrytime. If the promise is resolved in await, then the async function will automatically return Promise.resolve(void) whenever it is called.

In index.js, we can handle connectMongoDB just like any other promise. Since it can return Promise.resolve() or Promise.reject(), we can handle that again both by async-await (try IIFE) or .then,.catch method. Either way if Promise is resolved, only then we listen to the server, that means only then we start the server.





As for .then,.catch or Promise method we return mongoose.connect()url.then().catch(). If Promise is resolved, code inside .then() is executed and Prmise.resolved is returned and if Promise is rejected, code inside .catch is executed and Promise.reject() is returned automatically. NOw in index.js we can handle this promise again either using aync-await or .then.catch method.
 */



