const express = require('express');
const cors = require("cors");
const app = express();
const connectToMongoDB = require("./connection");
const dotenv = require('dotenv');
dotenv.config();
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');

//route imports
const userRoute = require("./routes/user");
const projectRoute = require("./routes/projects");
const dashboardRoute = require("./routes/dashboard");

//middlewares
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//connection to DB
connectToMongoDB(process.env.CONNECT_STRING)
    .then(console.log("Connection to MongoDB established!"))
    .catch((err) => { console.log("Connection to MongoDB failed.", err) })

//handling routes
app.use("/user", userRoute);
//all routes below this are protected
app.use(verifyJWT)
app.use("/", projectRoute);
app.use("/", dashboardRoute);

app.listen(5000, () => console.log("Server set on port 5000"));
