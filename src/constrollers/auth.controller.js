import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {addUser, getUser} from '../repository/user.repository.js'

export const signUp = async (req, res) => {
    try {
        const {name, email, password} = req.body
        const existUser = await getUser(email)
        if (existUser.length === 0) {
           const hashPassword = await bcrypt.hash(password, 10) 

           const user = await addUser(name, email, hashPassword)
           
           const token = jwt.sign({userId: user[0].id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

           delete user[0].hash_password 
           
           return res.status(201).json({
                success: true, message: 'User created sucessfully', data: user, token
           })
        } else {
            const error = new Error('This user already exists')
            error.statusCode = 409
            throw error
        }
    } catch (error) {
        return res.status(error.statusCode).json({success: false, message: error.message})
    }
}

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await getUser(email)
        
        if (user.length === 0) {
            const error = new Error('This user dont exists')
            error.statusCode = 401
            throw error
        }

        
        const passwordIsValid = await bcrypt.compare(password, user[0].hash_password)
        
        if (!passwordIsValid) {
            const error = new Error('Invalid credentials')
            error.statusCode = 401
            throw error
        }
        
        const token = jwt.sign({userId: user[0].id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        delete user[0].hash_password

        return res.status(200).json({success: true, message: 'User signed succesfully', data: user, token})
    } catch (error) {
        return res.status(error.statusCode).json({success: false, message: error.message})
    }
}