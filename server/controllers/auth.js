const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const axios = require("axios");
require('dotenv').config();

const handleUserRegister = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) return res.status(400).json({ "message": "missing credentials" });

    //duplicate user check
    const emailExists = await User.findOne({ email: email });
    if (emailExists) return res.status(400).json({ "message": "account already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    //random avatar generator
    const seed = Math.random().toString(36).substring(7);
    const url = `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${seed}`;

    try {
        const user = new User({
            username: username,
            password: hashedPassword,
            email: email,
            profile: {
                avatar_url: url
            }
        })
        const savedUser = await user.save();
        //TODO redirect to login page
        res.send(savedUser._id);
    } catch (err) {
        res.status(400).send(err);
    }
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) return res.status(400).json({ "message": "missing credentials" });

    //user check
    const userExists = await User.findOne({ email: email });
    if (!userExists) { return res.status(400).json({ "message": "email or password wrong" }); }

    const validPassword = await bcrypt.compare(password, userExists.password)
    if (!validPassword) { return res.status(400).json({ "message": "email or password wrong" }); }

    const accessToken = jwt.sign(
        { "_id": userExists._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
        { "_id": userExists._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    //saving refresh token in db and sending refresh token as cookie
    userExists.refreshToken = refreshToken;
    await userExists.save();
    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'None', secure: true });

    //access token to be sent as header
    res.json({ accessToken });

}

const handleUserLogout = async (req, res) => {
    //! TODO: delete access token on the client as well 

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken: refreshToken });
    //if user not found then clear the cookie anyways
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }

    //deleting refreshToken from db 
    user.refreshToken = "";
    await user.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204);
}

const handleGithubLogin = async (req, res) => {
    console.log(req);

    if(!req)
        return res.redirect("http://localhost:3000/login");

    // Create a JWT token
    const token = jwt.sign({id: req.user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

    // set JWT in a http-only secure cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 60*60*1000
    })

    /* // import the user repositories while loggin in
    const importRepos = await axios.get(`http://localhost:5000/github/repos`);

    if(importRepos.status !== 201) {
        console.log("Failed to import repos");
        res.redirect(`http://localhost:3000/login`);
    } */

    // Redirect URL
    res.redirect(`http://localhost:3000/dashboard`);  // Add query param token=${token} if required
}

module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleUserLogout,
    handleGithubLogin,
}