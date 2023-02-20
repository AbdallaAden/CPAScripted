const userModel = require('../models/User')



exports.validLogout = (req, res) => {
    //console.log(req.params.tokens)
    if(req.headers && req.headers['auth-token'] ){
        const token = req.headers['auth-token'].split(' ')[0]
        if(!token){
            return res.status(401).json({
                message:'Authorization failed',
                token:token
            })
        }
        const user = userModel.findOneAndUpdate(
        {email: req.body.email},
        {tokens:''},
        (err)=>{
            if(err) return res.json({success: false,err})
            return res.status(200).send({
                success : true,
                message: `${req.body.email} succesfully logged out`
            })
        }
    )
        
    //     const tokens = user.tokens;
    //     console.log(tokens+ ' tokens found')
    //     //const newTokens = tokens.filter(t => t.token !== token)
    //    res.clearCookie(['auth-token'])
    //     //console.log(newTokens)
        
    }
    
}