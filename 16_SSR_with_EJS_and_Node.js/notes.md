# Introduction

Server-Side rendering or SSR means rendering the HTML on the server and sending it to the client. This is different from client-side rendering, where the browser renders the HTML after receiving a minimal HTML file.

Maintainablity becomes very bad and code becomes messy when we code html in this way.
here we will be using EJS, which makes server-side rendering easy and maintainable.

# Steps

- Install ejs from npm
- Tell express that we our using ejs as our view engine using app.set()
- Now make a views directory and make ejs file inside it. 
  - ejs files are like html files but with some extra features like variables, loops, etc.
- Now in index.js again use app.set() to tell express where to find the views directory. 
  - require path module and use `path.resolve()` to join the current directory with the views directory.
- After that whenever we want to render an ejs file, just use res.render() and pass on the file name.
- Whenev we are rendering any file, we can also pass some data inside object as second parameter, into the ejs file. 
- See example.ejs!
  - HTML code is same as normal HTML, but when we need to embed any JS code, we have to wrap it in <% %> tags, in each line. 
  - <%= %> is used to print the value of a variable, and <%- %> is used to print the value of a variable without escaping it.
  - If we pass a string containing html code, then the later would simply treat it as string, while the later will treat it as html and render it on the page. Hence, it is advisable to use the primer and not the later one for safety.
- We will make a static.route.js file in router directory, this route handles all the static pages we will show in the app.
- Form the html page for URL shortener in home.ejs. There we will make a form and make the method as POST and action as will point the endpoint.
- Also, in the input type, add name which will be equal to whatevr we have added in our controller to be passed in the request body.
- After making the form, go to url.controller.js and from there istead of sending the response in json format in handleGenerateShortUrl, return res.render() and pass home.ejs as first paramter and shortId as the second parameter (which we will use in home.ejs)
- Now we will use the passed shortId from the controller in home.ejs
- This will be stored in the `locals` object, which is available in the ejs file.
- The home.ejs is rendered in the server and sent to the route when the user is at '/' route. After filling the forma dn making the POST method, the data is sent to the server and the shortId is generated, then the server renders the home.ejs file again with the shortId passed in the locals object. This is then accessed in home.ejs file and displayed to the user.