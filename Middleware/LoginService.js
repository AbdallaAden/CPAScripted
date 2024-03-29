const userModel = require('../models/User')
const Joi = require("@hapi/joi");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

console.log("welcome to login route")

const schema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
});

exports.validateLogin = async (req, res) => {
   /* const { error } = schema.validate(req.body);
    
    if (error) {     
      res.status(400).json(
        error.message.replace(/"/g,"")
        //data: error,
      );
    } 
    else {
       const user = await userModel.findOne({ email: req.body.email })
          if (!user) {
            return res.status(400).json(
              "No user with that email found" 
          );
          } 
          else {
                const validPass = await bcrypt.compare(req.body.password, user.password)
                if(!validPass) {
                    return res.status(400).send("Incorrect Password");
                }

                else{
                const token = JWT.sign({_id: user._id},process.env.TOKEN_SECRET, {expiresIn: "4h"})
                res.header('auth-token',token).send(token)

                let oldTokens = user.tokens || []

                if (oldTokens.length){
                    oldTokens = oldTokens.filter(t=>{
                       const timeDiff =  (Date.now()- parseInt(t.signedAt)) / 1000
                       if(timeDiff < 28800){
                        return t;
                       }
                    })
                }

                await userModel.findByIdAndUpdate(user._id, {tokens: [...oldTokens,{token, signedAt: Date.now().toString()}]}) 
                
          }
        };
      }*/
      try {

              const user = await userModel.findOne({ email: req.body.email });
        
              !user && res.status(404).json("user not found");
        
         
        
              const validPassword = await bcrypt.compare(req.body.password, user.password)
        
              !validPassword && res.status(400).json("wrong password")
        
         
        
              res.status(200).json(user)
        
            } catch (err) {
        
              res.status(500).json(err)
        
            }
    
}
