const multer = require('multer');
const { getAllUsers, getUserById, updateUserById, createNewUser, deleteUserById } = require("../services/CRUDservices")

const getHomePage = async (req, res) => {
    let results = await getAllUsers();
    return res.render("home.ejs", { listUsers: results })
};

const getList = (req, res) => {
    res.render("sample.ejs");
}

const getCreateUser = (req, res) => {
    res.render("create.ejs");
}

const getUpdateUser = async (req, res) => {
    let userId = req.params.id;
    let user = await getUserById(userId);
    res.render("edit.ejs", { userEdit: user });
}

const updateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    await updateUserById(email, name, city, userId);
    res.redirect("/");
}

const createUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    await createNewUser(email, name, city);
    res.redirect("/");
}

const deleteUser = async (req, res) => {
    let userId = req.params.id;
    console.log("checkk id: ", userId);
    await deleteUserById(userId);
    res.redirect("/");
}


const uploadFile = async (req, res) => {
    return res.render("uploadfile.ejs")
};


const upload = multer().single("profile_pic");

// const uploadMultiple = multer().array('multiple_images');

const handleUploadFile = (req, res) => {

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

const handleUploadMultipleFiles = (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./">Upload more images</a>';
    res.send(result);
}


module.exports = {
    getHomePage, getList, createUser, getCreateUser, getUpdateUser, updateUser, deleteUser, uploadFile, handleUploadFile, handleUploadMultipleFiles
}