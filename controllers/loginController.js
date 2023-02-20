const express = require('express')
const router = express.Router()
const loginService = require('../Middleware/LoginService')


router.post('/',loginService.validateLogin)
module.exports = router