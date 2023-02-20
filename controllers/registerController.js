const express = require('express')
const router = express.Router()
const userService = require('../services/UserService')
const userValidation = require('../Middleware/userValidation')


router.post('/',userValidation.CreateUserValidation,userService.createUser)
module.exports = router