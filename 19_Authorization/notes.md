# Difference between Authentication and Authorization

- Authentication is the process of verifying who a user is.
- Authorization is the process of verifying what a user has access to.

# Code

- Go to auth.middleware and refactor the code as shown.
- Go to index.js, change the import statement related to auth.middleware
- Refactor the User model to include a role field.
- Adding these middleares in index.js and static.route.js
- Also add user.role in the payload of the JWT token.
- Now, we will make a ADMIN related route in static.route.js