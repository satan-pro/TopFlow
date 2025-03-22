const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const router = express.Router();
const { handleUserRegister, handleUserLogin, handleUserLogout } = require('../controllers/auth');

router.post('/register', handleUserRegister);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);

router.get('/github', passport.authenticate('github', {scope: ["user:email", "read:user"]}));

router.get('/github/callback', passport.authenticate("github", {failureRedirect: "http://localhost:3000/login"}),
function(req, res) {
    console.log(req);
    const token = jwt.sign({id: req.user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

    // set JWT in a http-only secure cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 60*60*1000
    })
    // Redirect URL
    res.redirect(`http://localhost:3000/dashboard`);  // Add query param token=${token}
});

module.exports = router;

// Protect the API routes by using a middleware authenticateUser
// It validates the JWT token for the user/ cookies and lets them have access