# ATTENTION!!

SSR is added in next chapter. Kindly check next chapter for finished project.

# Introduction

We are making a URL shortner project, that will generate a short URL for a given long URL, and will redirect to the long URL when the short URL is accessed.

## Working of URL Shortner (here)

- We need to post a URL in `/url` endpoint, with params as `redirectUrl`
- This will genrerate a shortId using nanoid and return the id in json format and also store this shortid in database along with the long redirectUrl.
- When a user goes to `/url/:id` where :id the shortId generated, we redirect the user to the long URL, corresponding to the shortId stored in the database.
- This way we can shorten the URL and redirect the user to the long URL.
- Also to add analytics feature, we also add the time when the user is redirected in visitHistory array of the url. 
- See this feature in `url.controller.js` file. `VERY IMPORTANT!!`
- Now we make a analytics endpoint, which allows us to see all the redirect URLs and total clicks and last visited time.