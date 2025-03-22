const express = require('express');
const cors = require("cors");
const app = express();
const connectToMongoDB = require("./connection");
const dotenv = require('dotenv');
dotenv.config();
const verifyJWT = require('./middlewares/verifyJWT');
const credentials = require('./middlewares/credentials');
const cookieParser = require('cookie-parser');
const http = require('http');
const passport = require('passport');
require('./config/passport');
const session = require('express-session');
const { Server } = require('socket.io');

//route imports
const userRoute = require("./routes/auth");
const projectRoute = require("./routes/projects");
const dashboardRoute = require("./routes/dashboard");
const refreshTokenRoute = require("./routes/refreshToken");
const corsOptions = require('./config/corsOptions');

//middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: process.env.ACCESS_TOKEN_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

//connection to DB
connectToMongoDB(process.env.CONNECT_STRING)
    .then(console.log("Connection to MongoDB established!"))
    .catch((err) => { console.log("Connection to MongoDB failed.", err) })

// HTTP server creation
const server = http.createServer(app);

// socket.io initialization
const io = new Server(server, { cors:corsOptions });

io.on("connection", (socket)=>{
    console.log(`User connected : ${socket.id}`);

    // Joining rooms
    socket.on("join_room", (data)=>{
        socket.join(data);
    });

    // Send message only to rooms
    socket.on("send_message", (data)=>{
        // send message to receiver and senders
        io.to(data.room).emit("receive_message", data);
    })
});



//handling routes
app.use("/auth", userRoute);
app.use("/refresh", refreshTokenRoute);
//all routes below this are protected
app.use(verifyJWT)
app.use("/projects", projectRoute);
app.use("/dashboard", dashboardRoute);

// For socket to work you need to listen to server rather than app
server.listen(5000, () => console.log("Server set on port 5000"));
