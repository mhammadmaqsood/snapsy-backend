const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { registerValidate, loginValidate, forgetPasswordValidate, setPasswordValidate } = require("../middlewares/userSchemaValidator")

//Register Controller
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, bio, userType, profile } = req.body;

        //JOI Validation
        const { error } = registerValidate(req.body);
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

//LOGIN CONTROLLER
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //JOI Validation
        const { error } = loginValidate(req.body);
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

//Reset Password Through Email
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        //JOI Validation
        const { error } = forgetPasswordValidate(req.body);
        if (error) {
            console.log(error);
            return res.json("Invalid request, please provide valid email")
        }

        const checkUser = await userModel.findOne({ email });

        if (!checkUser) {
            return res.status(404).json({
                message: "User not found, please register"
            });
        }

        const token = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.MY_GMAIL,
                pass: process.env.MY_PASSWORD
            }
        });

        const receiver = {
            from: process.env.MY_GMAIL,
            to: email,
            subject: "Password Reset Request",
            text: `Click on the link to generate your new password: ${process.env.CLIENT_URL}/reset-password?token=${token}`
        };

        await transporter.sendMail(receiver);

        return res.status(200).json({ message: "Password reset link sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message // Send only the error message to avoid exposing sensitive information
        });
    }
};

//Function To Set New Password After Email
const setPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        //JOI Validation
        const { error } = setPasswordValidate(req.body);
        if (error) {
            console.log(error);
            return res.json("Please provide a new password")
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decode.email });

        //Hashing Password
        var salt = bcrypt.genSaltSync(10);
        const newhashedPassword = await bcrypt.hash(password, salt);

        user.password = newhashedPassword;

        await user.save();
        console.log("New Password: ", newhashedPassword);

        return res.status(200).json({
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message // Send only the error message to avoid exposing sensitive information
        });
    }
}

module.exports = { registerController, loginController, forgetPassword, setPassword }