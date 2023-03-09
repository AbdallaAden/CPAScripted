const express = require('express')
const router = express.Router()
const userService = require('../services/UserService')
const userValidation = require('../Middleware/userValidation')

router.get('/',userService.getAllUsers)
//router.get('/courses/', userService.getAllCourses)

router.get('/:id',userService.getUser)
router.get('/courses',userService.getByToken)

router.put('/:id',userService.updateUser)

//router.post('/',userValidation.CreateUserValidation,userService.createUser)

router.delete('/:id',userService.removeUser)
router.post('/subscribe',userService.subscribeToCourse)

module.exports = router