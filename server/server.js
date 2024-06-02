const express = require('express');
const cors = require("cors");
const app = express();
const connectToMongoDB = require("./connection");
const dotenv = require('dotenv');
dotenv.config();

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
connectToMongoDB(process.env.CONNECT_STRING)
    .then(console.log("Connection to MongoDB established!"))
    .catch((err) => { console.log("Connection to MongoDB failed.", err) })

//handling routes
app.use("/", projectRoute);
app.use("/", dashboardRoute);

//test
// const User = require("./models/User");
// app.get('/test', (req, res) => {
//     const user = new User({
//         username: 'john_doe',
//         email: 'john.doe@example.com',
//         password: 'hashed_password',
//         profile: {
//             name: 'John Doe',
//             bio: 'Software Developer',
//             avatar_url: 'http://example.com/avatar.jpg'
//         }
//     });
//     user.save().then(() => console.log('User created'));
//     res.send(user._id)
// })

app.listen(5000, () => console.log("Server set on port 5000"));
