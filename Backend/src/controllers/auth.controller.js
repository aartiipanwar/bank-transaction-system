const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');

/**
 * @route POST /api/auth/register
 * @desc user registration controller, creates a new user in the database
 * @access Public
*/
async function UserRegisterController(req, res){
    const {email, password, name} = req.body;

    const isExists = await userModel.findOne({
        email: email
    })

    if(isExists){
        return res.status(422).json({
            message: "User already exists",
            status: "Failed"
        })
    }

    const user = await userModel.create({
        email: email,
        password: password,
        name: name
    })

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})

    res.cookie("token", token)

    res.status(201).json({
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    await emailService.sendRegistrationEmail(user.email, user.name)
}

/**
 * @route POST /api/auth/login
 * @desc user login controller
 * @access Public
 */
async function UserLoginController(req, res){
    const {email, password} = req.body

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }
    const isValidPassword = user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})
    res.cookie("token", token)

    res.status(200).json({
        user:{
            _id:user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}

module.exports = {
    UserRegisterController,
    UserLoginController
}





