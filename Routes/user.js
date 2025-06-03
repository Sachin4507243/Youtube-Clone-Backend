const express = require("express");
const { signUp, signIn, logOut, profile } = require("../Controllers/user.js");
const Authorization = require('../Middlewears/auth.js')
const router = express.Router();



// POst User
router.post("/signup", signUp);

// Login User
router.post('/signin', signIn);

// logout
router.get('/logout', logOut);



module.exports = router;
