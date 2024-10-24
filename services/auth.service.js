const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { registerValidate, loginValidate, forgetPasswordValidate, setPasswordValidate } = require("../middlewares/user.validation")

//REGISTER USER SERVICE
const createUser = async (reqBody, res) => {
    try {
        const { userName, email, password, phone, bio, userType, profile } = reqBody;

        //JOI Validation
        const { error } = registerValidate(reqBody);
        if (error) {
            console.log(error);
            return res.json("Invalid request, please provide all the fields.")
        }

        //Check Existing User
        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(500).json({
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
        res.status(201).json({
            success: true,
            message: "Successfully Registered",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error in register API",
            error
        })
    }
}

//LOGIN USER CONTROLLER
const loginUser = async (userBody, res) => {
    try {
        const { email, password } = userBody;

        //JOI Validation
        const { error } = loginValidate(userBody);
        if (error) {
            console.log(error);
            return res.json("Invalid request, please provide both email and password")
        }

        //Check User
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        //Hashing Password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        //Token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in login API",
            error
        })
    }
}

module.exports = { createUser, loginUser }