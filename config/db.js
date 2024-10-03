const mongoose = require("mongoose");

//Function for mongo connection
const mongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${mongoose.connection.host}`)
    } catch (error) {
        console.log("DB Error: ", error)
    }
}

module.exports = mongoDb;