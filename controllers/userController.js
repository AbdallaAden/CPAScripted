const express = require('express')
const router = express.Router()
const userService = require('../services/UserService')
const userValidation = require('../Middleware/userValidation')

router.get('/',userService.getAllUsers)

router.get('/:id',userService.getUser,)

router.put('/:id',userService.updateUser)

router.post('/',userValidation.CreateUserValidation,userService.createUser)

router.delete('/:id',userService.removeUser)

module.exports = router