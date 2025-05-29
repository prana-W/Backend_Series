# Installation and Setup

- Install MongoDB Community version and start it.
- After that run `mongosh` to start the MongoDB shell.
- By default, we will be inside the `test` database.
- We can also have a graphical view of the database using MongoDB Compass.

# MongoDB 

We have collections inside which we can have multiple documents.

Example: Collection of users, where each user is a document.

## Basic Commands

- `show dbs` - List all databases.
- `use <database_name>` - Switch to a specific database or create it if it doesn't exist.
- `show collections` - List all collections in the current database.
- `db.<collection_name>.find()` - Find all (array of) documents in a collection.
-  `db.<collection_name>.insert({<data here>})` - Insert a new document into a collection.