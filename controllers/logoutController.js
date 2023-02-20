const express = require('express')
const router = express.Router()
const logoutService = require('../Middleware/LogoutService')
const auth = require('../Middleware/verifyToken')



router.get("/",auth.auth,logoutService.validLogout)

module.exports = router