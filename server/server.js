const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const connectToMongoDB = require("./connection");

//route imports
const projectRoute = require("./routes/projects");
const dashboardRoute = require("./routes/dashboard");

//middlewares
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connection to DB
connectToMongoDB('mongodb://127.0.0.1:27017/teampilotDB')
    .then(console.log("Connection to MongoDB established!"))
    .catch((err) => { console.log("Connection to MongoDB failed.", err) })

//handling routes
app.use("/", projectRoute);
app.use("/", dashboardRoute);

app.listen(5000, () => console.log("Server set on port 5000"));
