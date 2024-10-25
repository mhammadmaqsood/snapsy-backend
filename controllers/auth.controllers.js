const { createUser, loginUser } = require("../services/auth.service");

//Register Controller
const register = async (req, res) => {
    await createUser(req.body, res);
}

//LOGIN CONTROLLER
const login = async (req, res) => {
    await loginUser(req.body, res);
}

module.exports = { register, login }