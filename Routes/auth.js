const express = require('express');
const router = express.Router();

const  verifyEmailAndToken = require('../Controllers/authenticateUser');

router.post('/',  verifyEmailAndToken);


module.exports =  router;