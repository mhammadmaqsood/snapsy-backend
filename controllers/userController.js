const userModel = require("../models/userModel")

//Get User Info
const getUserController = async (req, res) => {
    try {
        //Find User
        //{_id:0} is to remove ID while displaying the user data in response
        const user = await userModel.findById({ _id: req.body.id }, { _id: 0 });
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

//Update User
const updateUserController = async (req, res) => {
    try {
        //Find User
        const user = await userModel.findById({ _id: req.body.id });

        //Validation
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //Update
        const { userName, address, phone } = req.body;
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
const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
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

module.exports = { getUserController, updateUserController, deleteProfileController }