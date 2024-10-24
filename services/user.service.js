const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { forgetPasswordValidate, setPasswordValidate } = require("../middlewares/user.validation")

//Reset Password Through Email || FUNCTION TO SEND EMAIL
const forgetPasswordEmail = async (userBody, res) => {
    try {
        const { email } = userBody;

        //JOI Validation
        const { error } = forgetPasswordValidate(userBody);
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
const setPassword = async (userParam, userBody, res) => {
    try {
        const { token } = userParam;
        const { password } = userBody;

        //JOI Validation
        const { error } = setPasswordValidate(userBody);
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

//GET USER SERVICE
const getUserData = async (userBody, res) => {
    try {
        //Find User
        //{_id:0} is to remove ID while displaying the user data in response
        const user = await userModel.findById({ _id: userBody.id }, { _id: 0 });
        //Validation
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //Hide Password
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "User get successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get User API"
        })
    }
}

//UPDATE USER
const updateUserData = async (userBody, res) => {
    try {
        //Find User
        const user = await userModel.findById({ _id: userBody.id });

        //Validation
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //Update
        const { userName, address, phone } = userBody;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        //Save User
        await user.save();
        res.status(200).json({
            success: true,
            message: "User Updated Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error in update API",
            error
        })
    }
}

//DELETE PROFILE CONTROLLER
const deleteUserProfile = async (userParams, res) => {
    try {
        await userModel.findByIdAndDelete(userParams);
        return res.status(200).json({
            success: true,
            message: "Your account has been deleted"
        })
    } catch (error) {
        console.log(error),
            res.status(500).json({
                success: false,
                message: "Error in delete profile API",
                error
            })
    }
}

module.exports = { forgetPasswordEmail, setPassword, getUserData, updateUserData, deleteUserProfile }