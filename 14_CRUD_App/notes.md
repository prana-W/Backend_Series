# MVC (Model-View-Controller) Architecture

- User calls route, which is handled by the controller, which then interacts with the model, from which the data is fetched and sent to the view (will be done in later lectures).

# CRUD App

- We will just refactor the previous code in 13_Hello_MongoDB to make the code more readable and maintainable.
- First make controllers, models, views, middlewares, and routes directories and connection.js file.
- Put userSchema and User model code in models/user.model.js and export it from there.
- Now, we will create routes in routes directory. We will put the routes there. 
  - NOTE: We will use router in place of app and router will be acquired from express.Router()
  - Then export router
  - Here the route is made specifically for users, therefore we can safely remove the /users part from the route.
  - It means / will actually mean /users and /:userId will mean /users/:userId and so on.
  - Now we will import the router in app.js and use it from there, base url will be /api/users, after which express will use routes provided in user.routes.js
- Make a connection.js file and add the MongoDB connection code there.
  - The code will be async and can be handled by async-await or Promises (.then, .catch), this function will be exported and used in index.js to make a connection.
  - In index.js, only when this function returns Promise.resolve(), then only connect to the server, else do nothing, as if no connection is made, the error will be handled in the connection.js file itself inside the catch block.
- Inside the middleware directory, create a file index.middleware.js, in which we will add the middleware function handler to log in a file whenever user goes to a route.
  - Export the function from there and put it inside app.use() in index.js
 
- Now, we put all the handler function in routes in controllers directory. After that we simply import those handlers in routes and use them.

 NOTE: Currently MongoDB is in our local storage, so there is no problem, but if we use cloud MongoDB, we should put the url in .env file otherwise we will expose our database credentials to the public.