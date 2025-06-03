# NOTE

- To access the server in mobile device, follow the given steps.
- Connect to same wifi network as your computer.
- Enter `hostname -U` in Linux terminal.
- Copy the IP address in mobile browser follower by :PORT (example: http://192.168.1.10:3000)
- Enjoy! 
- Don't hardcode URLs in server. AVoid hardcoding localhost, instead use req.get('host') to get the domain of the request. 

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

### Cookies

- Cookies are send by the server and is stored in the browser.
- Then in every request, the browser always send the cookies back to the server.
- Cookies are domain specific, meaning that if you set a cookie for `example.com`, it will not be sent to `another-example.com`.
- We can also pass other options in res.cookie() like domain, expires etc
- Cookies are browser specific and hence can't be accessed in mobile apps
- So other way to sending the token is simply through res.json({}) and let the client handle the token by themselves. 
- In case of mobile apps, we can store the token in their device storage or make a file. 
- In such case we will ask the client to send the token in the headers of the request before accessing any route (which is protected). 
- Then this token can saved somewhere in the client side (example device storage etc) and then on every request, the client can send the token in the headers of the request.
- The standard way of sending the token in the headers is `Authorization: Bearer <token>`.

THEREFORE, cookies can be use for web application, while headers can be used if we want to make the application work on varoius platforms like web, mobile. 


### user.controller (inside handleUserLogin)
```javascript

return res.json({token}) // instead of res.cookie and return res.redirect()

```

### auth.middleware (restrictToLoggedInUserOnly and getCurrentUser)
```javascript

const userUid = req.headers['authorization']
// some code here
const token = userUid.split(' ')[1] // Bearer <token>

```
