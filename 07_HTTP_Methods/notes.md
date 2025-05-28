# HTTP Methods

There are several HTTP methods that can be created on a particular path. Here are some of the most important ones:

1. GET: This method is used to retrieve data from a server. It is the most common HTTP method and is used to request resources such as HTML pages, images, or data from APIs.
2. POST: This method is used to send data to a server, typically to create a new resource. It is often used in forms where users submit data.
3. PUT: This method is used to update an existing resource on the server. It replaces the entire resource with the new data provided in the request.
4. DELETE: This method is used to delete a resource from the server. It is typically used to remove data that is no longer needed.
5. PATCH: This method is used to apply partial modifications to a resource. Unlike PUT, which replaces the entire resource, PATCH only updates the specified fields.

- We can use switch cases to handle routing and in each if can use if statements to handle the specific HTTP methods.
- For simplification, we will use Express.js, in upcoming lectures, which is a web framework for Node.js that simplifies the process of handling HTTP requests and routing

- For example: When we visit the /signup page we will make a GET request which will return the signup form. When we submit the form, it will make a POST request to the same /signup page which will create a new user.
