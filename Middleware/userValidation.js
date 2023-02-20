const userModel = require("../models/User");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  firstName: Joi.string().max(20).required(),
  lastName: Joi.string().max(20).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
});

exports.CreateUserValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);

    if (error) {     
      res.status(400).json({
        message: error.details[0].message,
        //data: error.details[0].message,
      });
    } else {
      userModel.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          return res.status(400).json({ 
            email: "A user with that Email already exists" 
        });
        } else {
          next();
        }
      });
    }
};
