# Installation and Setup

- Install MongoDB Community version and start it.
- After that run `mongosh` to start the MongoDB shell.
- By default, we will be inside the `test` database.
- We can also have a graphical view of the database using MongoDB Compass.
- We can also use Database option in WebStorm to connect to MongoDB.

NOTE: Currently MongoDB is in our local storage, so there is no problem, but if we use cloud MongoDB, we should put the url in .env file otherwise we will expose our database credentials to the public.

# MongoDB 

We have multiple databases, inside which we have collections and inside which we can have multiple documents.

Example: Collection of users, where each user is a document.

- In MongoDB, we have schema (which is like the structure of the data).
- using this schema, we create a model.
- Using model we can perform CRUD operations (Create, Read, Update, Delete).

## Basic Commands

- `show dbs` - List all databases.
- `use <database_name>` - Switch to a specific database or create it if it doesn't exist.
- `show collections` - List all collections in the current database.
- `db.<collection_name>.find()` - Find all (array of) documents in a collection.
-  `db.<collection_name>.insert({<data here>})` - Insert a new document into a collection.



## Connecting Node.js to MongoDB

- Make sure MongoDB is running, bu running mongosh in a terminal.
- Install `mongoose` which is an ODM (Object Data Modeling) library for MongoDB and Node.js.
- Import mongoose using require statement.
- First define a Schema (here user Schema)
- Then make a model from that schema
- Then, connect node.js to MongoDB using mongoose.connect(<URI>)
  - URI: <mongo_db_url>+<database_name>
- This will return a promise, so we can use .then() and .catch() to handle success and error.
- After this we create a new user from app.post() method.
  - Remember to make the handler function async, as creating the user will take time. 
  - Then create a new User and pass on the required data.
- Now, we need to fetch data from the database.
  - Go to app.get() for /users and /api/users, in those make the handler function async.
  - Then use User.find({}) to fetch all users from the database.
  - .find({}) means fetch all the data from the User collection.

NOTE: Don't forget to add the `async` keyword to the handler functions where you are performing database operations, as these operations are asynchronous and will take some time to complete.