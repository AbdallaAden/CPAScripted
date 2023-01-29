const express = require('express')
const router = express.Router()
const userService = require('../services/UserService')


router.get('/',userService.getAllUsers)

router.get('/:id',userService.getUser,)

router.put('/:id',userService.updateUser)

router.post('/',userService.createUser)

router.delete('/:id',userService.removeUser)

module.exports = router