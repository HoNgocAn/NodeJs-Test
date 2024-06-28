const express = require("express");
const router = express.Router();
const { getHomePage, getList, createUser, getCreateUser, updateUser, getUpdateUser, deleteUser, uploadFile, handleUploadFile, handleUploadMultipleFiles } = require("../controller/homeController");
const multer = require('multer');
const path = require('path');
var appRoot = require("app-root-path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(">>>Check appRoot: ", appRoot);
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

router.get('/', getHomePage);

router.get('/getlist', getList);

router.get('/create', getCreateUser);

router.get('/update/:id', getUpdateUser);

router.post('/create-user', createUser);

router.post('/update-user', updateUser);

router.post('/delete/:id', deleteUser);

router.get('/upload', uploadFile);

router.post('/upload-profile-pic', upload.single("profile_pic"), handleUploadFile);

router.post('/upload-multiple-images', (req, res, next) => {
    upload1(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code == "LIMIT_UNEXPECTED_FILE") {
            res.send("Only upload 3 files or less")
        } else if (err) {
            res.send(err)
        } else {
            next()
        }
    })
}, handleUploadMultipleFiles);

module.exports = router;