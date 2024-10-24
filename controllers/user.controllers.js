const { forgetPasswordEmail, setPassword, getUserData, updateUserData, deleteUserProfile } = require("../services/user.service");

//FORGET PASSWORD USER SEND EMAIL Controller
const forgetPassword = async (req, res) => {
    await forgetPasswordEmail(req.body, res);
}

//SET NEW PASSWORD AFTER EMAIL CONTROLLER
const setNewPassword = async (req, res) => {
    await setPassword(req.params, req.body, res);
}

//GET USER CONTROLLER
const getUser = async (req, res) => {
    await getUserData(req.body, res);
}

//UPDATE USER CONTROLLER
const updateUser = async (req, res) => {
    await updateUserData(req.body, res)
}

//DELETE USER CONTROLLER
const deleteUser = async (req, res) => {
    await deleteUserProfile(req.params.id, res);
}

module.exports = { forgetPassword, setNewPassword, getUser, updateUser, deleteUser };