# Status Codes

Different HTTP status codes indicate the result of a request. They are grouped into five categories:

1. 1xx - Informational: These codes indicate that the request was received and understood, and that the server is continuing to process it.
2. 2xx - Success: These codes indicate that the request was successfully received, understood, and accepted. 
   - Example: 200 OK indicates that the request was successful and the server returned the requested resource.
   - 201 Created indicates that a new resource was successfully created as a result of the request.
3. 3xx - Redirection: These codes indicate that further action is needed to complete the request, often involving a redirection to another URL.
4. 4xx - Client Error**: These codes indicate that there was an error with the request made by the client, such as a malformed request or a resource not found.
5. 5xx - Server Error: These codes indicate that the server failed to fulfill a valid request, often due to an internal error.

404 - Bad Request (Missing or invalid parameters from frontend)
404 - Not Found
201 - Created Successfully
500 - Internal Server Error (Something went wrong on the server side)

Read more about on MDN Docs
