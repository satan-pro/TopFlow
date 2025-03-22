const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.cookies['jwt'];
    if (!authHeader) return res.sendStatus(401);
    // const authToken = authHeader.split(' ')[1];
    jwt.verify(
        // authToken,
        authHeader,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);

            // unreachable code
            console.log(decoded);
            req.user = decoded.id;
            next();
        }
    );
}

module.exports = verifyJWT;