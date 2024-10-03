const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//Register Controller
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, bio, userType, profile } = req.body;

        //Validation
        if (!userName || !email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        //Check Existing User
        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(500).send({
                success: false,
                message: "Email already exists"
            })
        }

        //Hashing Password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create New User
        const user = await userModel.create({
            userName, email, password: hashedPassword, phone, bio, userType, profile
        });
        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in register API",
            error
        })
    }
}

//LOGIN CONTROLLER
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validation
        if (!email || !password) {
            res.status(500).send({
                success: false,
                message: "Please provide both email and both password"
            })
        }

        //Check User
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }

        //Hashing Password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            })
        }

        //Token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.status(200).send({
            success: true,
            message: "Login Successful",
            token,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error
        })
    }
}

module.exports = { registerController, loginController }