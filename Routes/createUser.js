const express = require('express')
const createUser = require('../Controllers/createUser')


const router = express.Router();

router.get('/register', createUser);