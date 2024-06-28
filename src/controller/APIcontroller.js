const { getAllUsers, createNewUser, updateUserById, deleteUserById } = require("../services/CRUDservices")

let getAllUsersAPI = async (req, res) => {
    let results = await getAllUsers();
    return res.status(200).json({
        data: results
    })
}

let createUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    if (!email || !name || !city) {
        return res.status(200).json({
            message: "error"
        })
    }
    await createNewUser(email, name, city);
    return res.status(200).json({
        message: "create new user success"
    })
}

let updateUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.id;

    if (!email || !name || !city || !userId) {
        return res.status(200).json({
            message: "error"
        })
    }
    await updateUserById(email, name, city, userId);
    return res.status(200).json({
        message: "update new user success"
    })
}

let deleteUserAPI = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: "error"
        })
    }
    await deleteUserById(userId);
    return res.status(200).json({
        message: "delete user success"
    })
}


module.exports = {
    getAllUsersAPI, createUserAPI, updateUserAPI, deleteUserAPI
}