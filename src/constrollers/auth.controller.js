import {addUser, getUser} from '../repository/user.repository.js'

export const signUp = (req, res) => {
    const {name, email, password} = req.body
    addUser(name, email, password)
    return res.json({success: true, message: 'User created sucessfully'})
}

export const signIn = (req, res) => {
    const {email} = req.body
    const user = getUser(email)
    return res.json({success: true, message: 'User signed succesfully', data: user})
}