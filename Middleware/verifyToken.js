const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) =>{
    const token = req.header('auth-token')
    if(!token)return res.status(401).send('Access Denied')

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        const user = await User.findById(verified.used_id)
        req.user = verified;
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}