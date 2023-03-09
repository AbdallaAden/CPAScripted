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
  