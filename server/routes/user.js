const express = require("express");
const router = express.Router();
const { handleUserLogin, handleUserRegister } = require('../controllers/auth');

router.post('/register', handleUserRegister);
router.post('/login', handleUserLogin);

module.exports = router;