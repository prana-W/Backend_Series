# Stateless Authentication

- There is no state in the backend.
- We put the state inside the token itself and also we sign it to prevent tampering of the token.
- The token is self-contained and can be verified without needing to access a database or server-side session store.
- We will be using JSON web tokens (JWT) for this purpose.

# Code

- Install jsonwebtoken package
- Go to auth.service
- Setup as shown. Also we need a sign (which is the secret key) which we will pass as well to create a jwt. Secret Key can be anything, but it is recommended to use a long random string.
- require dotenv in auth.service to be able to use JWT_SECRET from .env file.
- Go to user.controller and remove the session logic

## NOTE

- jwt is stored in the cookies. If you paste this jwt in jwt.io website, we can get the payload in return without the need to provide secretKey.
- Therefore, jwt should be treated as sensitive information as leaking it can expose the payload, we are storing the token. This is the reason we avoided storing password in the payload.
- Now if anybody changes the payload in the jwt.io to other user payload, and generate the new jwt token, then using it in our browser by replacing the uid will result in failure. As we didn't provide the secretKey on the creataion of the token, jwt verifies it and throws an error.
- Example for hacking:
1. Copy jwt token of other user and paste in in broswer in place of your jwt token.
2. Generate a new jwt token by providing with the payload of other user and secretKey. Then use the jwt token in the browser to log in into the other user account.
