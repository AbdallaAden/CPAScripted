const courseModel = require('../models/Courses')

exports.createCourse = (req, res) => {

    const Course = new courseModel(req.body)

    Course.save()
        .then((newCourse) => {
            res.json({
                message: "The Course was successfully created",
                data: newCourse
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })

        })
}