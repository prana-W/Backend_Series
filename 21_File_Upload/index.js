const path = require('path');
const express = require('express');

//! Importing Multer and making an instance of it
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads'); // here files will be stored in /uploads directory. We can also make a sub-folder for each user like ./uploads/user._id
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`); //this will be the file name(made it unique)
    }
})

const upload = multer({storage});

const app = express();
const PORT = 8001;

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    return res.render('homepage')
})

app.post('/upload', upload.single('profile-image'), (req, res) => {
    console.log(req.body);
    console.log(req.file)

    return res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})