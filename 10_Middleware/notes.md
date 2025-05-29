# Middleware - acts between the request and response cycle

# Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

- We can use middleware to:
  - Execute code
  - Modify the request and response objects
  - End the request-response cycle
  - Call the next middleware function in the stack