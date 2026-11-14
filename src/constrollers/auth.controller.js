import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {addUser, getUser} from '../repository/user.repository.js'

export const signUp = async (req, res) => {
    const {name, email, password} = req.body

    const user = await addUser(name, email, password)

    return res.json({success: true, message: 'User created sucessfully', data: user})
}

export const signIn = async (req, res) => {
    const {email, password} = req.body
    const user = await getUser(email)
    return res.json({success: true, message: 'User signed succesfully', data: user})
}