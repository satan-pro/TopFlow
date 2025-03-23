const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const { handleUserRegister, handleUserLogin, handleUserLogout, handleGithubLogin } = require('../controllers/auth');

router.post('/register', handleUserRegister);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);

router.get('/github', passport.authenticate('github', {scope: ["user:email", "read:user"]}));

router.get('/github/callback', passport.authenticate("github", {failureRedirect: "http://localhost:3000/login"}), handleGithubLogin);

module.exports = router;

// Protect the API routes by using a middleware authenticateUser
// It validates the JWT token for the user/ cookies and lets them have access