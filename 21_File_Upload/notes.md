# Steps

- First make a basic UI and settings for express, ejs etc.
- Install multer package, which helps in file upload.
- Read the docs for multer and understand how it works. Check homepage.ejs for an example. 
- After storing the file in our server (in uploads directory), we can store the file path (using req.file.path) in our database.
- But in real-life, after uploading the file in our server, we will upload it in a cloud service like cloudinary and then delete the file from our server, and pass the cloudinary URL to our database.