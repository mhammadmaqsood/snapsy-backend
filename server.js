const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//Rest Object
const app = express();

//Dotenv Configuration
dotenv.config();

//Db Connection
connectDb();

//Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/authRoutes"))
app.use("/api/v1/user", require("./routes/userRoutes"))
app.use("/api/v1/post", require("./routes/postRoutes"))

//PORT
const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});