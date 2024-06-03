const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
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
        //!redirect to login page
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

module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleUserLogout,
}