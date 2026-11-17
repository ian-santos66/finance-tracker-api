
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as userRepository from '../repositories/userRepository.js'

export const signUp = async (req, res) => {
    try {
        const {name, email, password} = req.body
        const existUser = await userRepository.findByEmail(email)
        if (!existUser) {
           const hashPassword = await bcrypt.hash(password, 10) 

           const user = await userRepository.create(name, email, hashPassword)
           
           const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

           delete user.hash_password 
           
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
        const user = await userRepository.findByEmail(email)
        
        if (!user) {
            const error = new Error('This user dont exists')
            error.statusCode = 401
            throw error
        }

        
        const passwordIsValid = await bcrypt.compare(password, user.hash_password)
        
        if (!passwordIsValid) {
            const error = new Error('Invalid credentials')
            error.statusCode = 401
            throw error
        }
        
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        delete user.hash_password

        return res.status(200).json({success: true, message: 'User signed succesfully', data: user, token})
    } catch (error) {
        return res.status(error.statusCode).json({success: false, message: error.message})
    }
}