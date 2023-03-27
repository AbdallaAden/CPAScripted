const userModel = require('../models/User')
const courseModel = require('../models/Courses')
require('dotenv').config({ path: '../config/keys.env' });
const nodemailer = require('nodemailer');


exports.createUser = (req, res) => {

    const user = new userModel(req.body)

    user.save()
        .then((newUser) => {
            // res.json({
            //     message: "The User was successfully created",
            //     data: newUser
            // })
            this.confirmUser(user);
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })

        })
}

exports.confirmUser = (tuser) => {
    userModel.findById(tuser._id)
        .then(user => {
            if (user) {


                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.APPPASS
                    },

                  });
                  console.log(transporter)
                
                  const message = {
                    from: 'process.env.EMAIL',
                    to: user.email,
                    subject: 'Confirmation to CPAScripted',
                    text: `Dear ${user.username},\n\nThank you for signing up to CPAScripted.\n\nClick the link below to get confirmed\n\n <a>LINK<a>`
                  };

                
                  // Use the transporter to send the email
                  transporter.sendMail(message, function(err, info) {
                    if (err) {
                      console.error('Error sending confirmation email:', err);
                    } else {
                      console.log('Confirmation email sent:', info);
                    }
                  });


                // res.json({
                //     message: `User with id ${req.params.id}`,
                //     data: user
                // })

                console.log("Email sent")
            } else {
                // res.status(404).json({
                //     message: `No user with id ${req.params.id}`
                // })
                console.log("No user found")
            }
        })
        .catch(err => {
            console.log(err)

        })
    }


exports.removeUser = (req, res) => {
    userModel.findByIdAndRemove(req.params.id)
        .then(UpdatedUser => {

            if (UpdatedUser) {
                res.json({
                    message: `User with id ${req.params.id} successfully deleted`,
                    data: UpdatedUser
                })
            } else {
                res.status(404).json({
                    message: `No user with id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })
}

exports.getAllUsers = (req, res) => {
    userModel.find()
        .then(users => {
            res.json({
                message: "List of all the users",
                data: users,
                totalUsers: users.length
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })

        })
}

exports.getUser = (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {

            if (user) {
                res.json({
                    message: `User with id ${req.params.id}`,
                    data: user
                })
            } else {
                res.status(404).json({
                    message: `No user with id ${req.params.id}`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })

}
exports.getUserByToken = (req, res) => {
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
};

exports.updateUser = (req, res) => {
    userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(UpdatedUser => {

            if (UpdatedUser) {
                res.json({
                    message: `User with id ${req.params.id} successfully updated`,
                    data: UpdatedUser
                })
            } else {
                res.status(404).json({
                    message: `No user with id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })
}
/*exports.getAllCourses = (req, res) => {
    const userId = req.params.userId;
    //console.log(req.query.token)
    courseModel.find({ students: userId })
      .then(courses => {
        res.json({
          message: "List of all courses",
          data: courses,
          totalCourses: courses.length
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  };*/
  exports.getAllUserCoursesByToken = (req, res) => {
    const token = req.query.token;
    console.log(token)
    userModel.findOne({ token: token })
      .populate('courses')
      .then(user => {
        res.json({
         message: "List of all courses",
          data: user.courses,
          totalCourses: user.courses.length});
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  };
  exports.subscribeToCourse = async (req, res) => {
    try {
      const userId = req.params.id;
      const userToken = req.body.user;
      const courses = req.body.courseIds;
  
      // Find user document based on token
      const user = await userModel.findOne({ "tokens.token": userToken });
  
      // Update user document with new courses
      await userModel.findByIdAndUpdate(user._id, {
        $addToSet: { courses: courses },
      });
  
      // Find the added courses and update their user field
      const coursesToUpdate = await courseModel.find({ _id: { $in: courses } });
      for (const courseToUpdate of coursesToUpdate) {
        await courseModel.findByIdAndUpdate(courseToUpdate._id, {
          $addToSet: { students: user },
          userId: userId,
        });
      }
  
      // Remove the user and students fields of each unselected course document
      const unselectedCourses = await courseModel.find({ _id: { $nin: courses } });
      for (const courseToUpdate of unselectedCourses) {
        await courseModel.findByIdAndUpdate(courseToUpdate._id, {
          $pull: { students: user._id },
        });
      }
  
      // Remove the unselected courses from user document
      await userModel.findByIdAndUpdate(user._id, {
        $pullAll: { courses: unselectedCourses },
      });
  
      // Return success response
      res.json({
        message: "Successfully subscribed to courses",
        data: courses,
        user: user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  
  
  