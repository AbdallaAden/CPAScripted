const courseModel = require('../models/Courses')

exports.createCourses =  (req, res) => {
    try {
      const courses = req.body;
      const createdCourses = courseModel.insertMany(courses);
      res.status(201).json({
        message: "Courses created successfully",
        data: createdCourses
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  };

  exports.getAllCourses = (req, res) => {
    courseModel.find()
        .then(courses => {
            res.json({
                message: "List of all the courses",
                data: courses,
                totalcourses: courses.length
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })

        })
}

exports.getCourse = (req, res) => {
  console.log('course id passed : ',req.params.id)
  courseModel.findOne({'code' : req.params.id})
  .then(course => {

      if (course) {
          res.json({
              message: `course with id ${req.params.id}`,
              data: course
          })
      } else {
          res.status(404).json({
              message: `No course with id ${req.params.id}`
          })
      }
  })
  .catch(err => {
      res.status(404).json({
          message: err
      })

  })
}
  