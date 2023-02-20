const express = require('express')
const router = express.Router()
const courseService = require('../services/CourseService')



router.post('/',courseService.createCourse)
module.exports = router