const express = require('express')
const router = express.Router()
const userService = require('../services/UserService')
const userValidation = require('../Middleware/userValidation')
const userModel = require('../models/User')

router.get('/',userService.getAllUsers) /*{
   if(req.query.user){
    console.log(req.query.user)   
    const token = req.query.user;
  userModel.findOne({ "tokens.token": token })
    .then(user => {
      if (user) {
        res.json({
          message: `User with token ${token}`,
          data: user
        });
      } else {
        res.status(404).json({
          message: `No user with token ${token}`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
}
const userId = req.query.userId;
const username = req.query.username;
try {
  const user = userId
    ? await User.findById(userId)
    : await User.findOne({ username: username });
  const { password, updatedAt, ...other } = user._doc;
  res.status(200).json(other);
} catch (err) {
  res.status(500).json(err);
}
0
  })*/
//router.get('/courses/', userService.getAllCourses)

router.get('/:id',userService.getUser)
router.get('/course/:id',userService.getAllUserCoursesById)
//router.get('/courses',userService.getByToken)

router.put('/:id',userService.updateUser)

//router.post('/',userValidation.CreateUserValidation,userService.createUser)

router.delete('/:id',userService.removeUser)
router.post('/subscribe',userService.subscribeToCourse)
router.get('/friends/:id',userService.getAllUserFriends)

module.exports = router