# Authentication 

## Stateful Authentication (Session based Authentication)
- Maintains state (some data) in the server-side
- Analogy: We go to a mall and want to park our car. THec ar is given to the parking boy, who takes the car, park it and gives us a token number. In his notebook, he writes the token number and also to what car does it belong. So when I come back later; and ask for my car and give him that token numnber, he can look up the car that is being pointed by that token and returns our car and deletes the entry from his notebook. This data in his notebook is the state.
- Comparision: We, the client, give the server our email and password, and the server returns back session unique id (session uid). Whenever we want to make or access anything from the server, we have to show our id to the server and then the server checks to what user does the uid points in its state; and after verifying, it returns the data.
- This session uid can be given by the server through cookies, response or headers.
- Express Flow:
  - Client makes a request in authMiddleware, which checks for cookie values or uid, only if valid, it allows next() else rejects the request.

### Code

- Go to models directory and make user.model.js and add the schema for User here
- Now inside the route directory, make user.route.js, which will have login, signup routes and in controller directory, make a user.controller.js which will have handlers for these routes
- After all this connect evrything in index.js and proceed with making the isgnup page in views.ejs directory. We will make the route for this in static.route.js
- Now we will make for login. First make its route and controller. Then make a ejs file and add the ejs file in static.route.js
  - NOTE: Remember to use locals.something when trying to check if data is passed. 
  - Check all routes carefully.
- Now we will need to make a unique session id whenever the user logs in and keep back that id to the client.
- So, to generate this we will be using uuid package.
  - Import this in user.controller.js and use it to generate a unique id.
- Make a `services` directory and add a auth.service.js. This is a service inside which, we will use hash map to create mapping between sessionId and user object and also get/return mapped user when provided by sessionId.
- Import both the function in the user.controller.js cand pass the sessionId into the cookies.
- Now we will make a middleware which takes this cookie (sessionId) and check if it Maps to any user, if it does that let the request be fulfileed else reject.
- Since we are using cookies, we need to parse it to be able to use it. Therefore, install cookie-parser package and use it in index.js
- We will use setUser whenever we login with the user, there sessionId and user._id in auth.service.js in sessions collection
- We also make getUser function which return the user object and takes sessionId as parameter. This function is called in auth.middleware.js in various places, where we first fetch uid from the cookies stored in the browser and then pass that in the getUser, if we get a valid user from there then we make the request else redirect the user to login page.
- This prevents random user from acessing other datas.
- Also we fetch the user data only in API end-points and home page.

### Commonly made mistake

- Always use optional chaining when trying to access properties of an object which may not be present. This will prevent the code from crashing. 
  - Example: sessionObj?.userId (if not found returns undefined instead of crashing)
- Use inline middlewares to prevent unauthorised access to routes.
- Use return keyword always!
  - Example: return res.redirect('/login'); return res.send() etc
  - This prevents the code from executing further and returns from the present function.
- Use try-catch block in async-await.
- DB is in another continent!


### CONS of stateful authentication: 

- We can see that steful authentication is very resource intensive, as we also need to maintian the state of the user in the backend (server-side)
- All users get logged out, once the server restarts, as the state is lost.

## Stateless Authentication (Token based Authentication)
- It doesn't have any state in the server-side
- Discussed in next lecture

But can't we just store the session data in the database?
NO!!!

- It will increase the latency as database is in another continent increasing the delay.
- If we access database for every request, it will increase the load on the database and also increase the cost of the project.
