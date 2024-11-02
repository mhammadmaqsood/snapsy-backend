const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const config = require('./middlewares/env.validation');

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

app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/user", require("./routes/user.routes"));
app.use("/api/v1/post", require("./routes/post.routes"));
app.use("/api/v1/like", require("./routes/like.routes"));
app.use("/api/v1/comment", require("./routes/comment.routes"));
app.use("/api/v1/reel", require("./routes/reel.routes"));
app.use("/api/v1/story", require("./routes/story.routes"));

//PORT
const PORT = process.env.PORT || 8080;

//Listen
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
});