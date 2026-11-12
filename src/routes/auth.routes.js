import {Router} from 'express'

const authRouter = Router()

authRouter.post('/auth/sign-up', (req, res) => {res.status(201).json({success: true, message: 'User created succesfully'})})
authRouter.post('/auth/sign-in', (req, res) => {res.status(201).json({success: true, message: 'User signed succesfully'})})

export default authRouter