# Design REST API

- We want to create a hybrid server that can be used for both mobile app and a website. So we will serve our JSON format API in /api/users, while normal HTML format API in /users

- GET /users - List all users (HTML)
- GET /api/users - List all users (JSON)

- GET /api/users/1 - Get user with ID 1
- GET /api/users/:id - Get user with ID id
    - It means :id is a variable/dynamic part of the URL

- POST /api/users - Create a new user

- PATCH /api/users/1 - Update user with ID 1

- DELETE /api/users/1 - Delete user with ID 1


### For now:

- For now, we will hardcode the data in the code, later we can connect to a database and use that data instead. 
- Hardcoded data will be used from mockaroo.com
- Download the data in JSON format and save it in this directory as `users.json`

# Code

- Import the `users.json` file in index.js (using require keyword)
- Now for /api/users, we will return the data from the users.json in JSON format
- For /users, we will return the data in HTML format