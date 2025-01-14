const mongoose = require('mongoose')
const userModel = require('../models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// function to sign

const createToken = async(id)=>{
    return jwt.sign({_id:id},process.env.SECRET,{expiresIn:'3d'})
}

// function to get all users

const GET_USERS = async (req,res)=>{

    try {

        const users = await userModel.find({})

        return res.status(200).json(users)
        
    } catch (error) {
        console.log(error)
    }
}

// function to sign up

const SIGN_UP = async(req,res)=>{

    const { firstname, lastname, email, phone, password } = req.body 

    if (!firstname || !lastname || !email || !phone || !password){
        return res.status(400).json({mssg:"Please fill all the information"})
    }

    try {

        const hashedpassword = await bcrypt.hash(password,8)
        const user = await userModel.create({ firstname, lastname, email, phone, password:hashedpassword })
        const token = await createToken(user._id)

        console.log(createToken(user._id))


        return res.status(200).json({user,token})

    } catch (error) {
        console.log(error)
    }
}

// function for user login

const LOG_IN = async(req,res)=>{
    const {email,password} = req.body

    if (!email || !password){
        return res.status(400).json({message:"please fill out all information"})
    }

    try {
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(404).json({message:"opps user not found"})
        }

        const hashedpassword = user.password
        const match = await bcrypt.compare(password,hashedpassword)

        if (!match){
            return res.status(404).json({message:"login failed. Check your email or password!"})
        }

        const token = await createToken(user._id)
        

        return res.status(200).json({user,token})


    } catch (error) {
        console.log(error,"here is the error")
    }

}

const DELETE_A_USER = async (req,res)=>{
    const {id} = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ){
        
        return res.status(400).json({message:"invalid id"})
    }

    try {

        const user = await userModel.deleteOne({_id:id})
        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
    }
}

const LOG_OUT = async(req,res)=>{

    req.id = ""

    return res.status(200).json({message:"user logged out successfuly."})
}

module.exports = {SIGN_UP,LOG_IN,GET_USERS,LOG_OUT,DELETE_A_USER}