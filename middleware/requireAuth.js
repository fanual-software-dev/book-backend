const jwt = require('jsonwebtoken')
const userModel = require('../models/usersModel')

const requireAuth = async (req,res,next)=>{

    const {authorization} = req.headers

    if (!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }

    const token = authorization.split(' ')[1]

    try {

        const{_id} = await jwt.verify(token,process.env.SECRET)

        req.id = await userModel.findOne({_id}).select('_id')

        next()
        
    } catch (error) {
        return res.status(401).json({error:"Not Authorized"})
    }
}

module.exports = requireAuth