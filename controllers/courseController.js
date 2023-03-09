const express = require('express')
const router = express.Router()
const courseService = require('../services/CourseService')

router.post('/',courseService.createCourses)
router.get('/',courseService.getAllCourses)


module.exports = router