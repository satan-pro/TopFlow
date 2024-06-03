const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const user = User.findOne({ refreshToken: refreshToken });
    if (!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user._id !== decoded._id) return res.sendStatus(403);
        }

    )
    const accessToken = jwt.sign(
        { "_id": user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
    res.json({ accessToken });
}

module.exports = handleRefreshToken;