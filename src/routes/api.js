const express = require("express");
const router = express.Router();

const { getAllUsersAPI, createUserAPI, updateUserAPI, deleteUserAPI } = require("../controller/APIcontroller");


router.get('/user', getAllUsersAPI);
router.post('/create-user', createUserAPI);
router.put('/update-user', updateUserAPI);
router.delete('/delete-user/:id', deleteUserAPI);



module.exports = router;