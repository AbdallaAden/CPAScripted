const express = require('express')
const router = express.Router()
const courseService = require('../services/CourseService')

router.post('/',courseService.createCourses)
router.get('/',courseService.getAllCourses)
router.get('/:id', courseService.getCourse)


module.exports = router