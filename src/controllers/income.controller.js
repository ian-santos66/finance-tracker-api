import {create, findByUserId} from '../repositories/income.repository.js'

export const newIncome = async (req, res) => {
    const {amount, description} = req.body
    const income = await create(req.user.id, amount, description)
    return res.json({success: true, data: income})
}

export const getUserIncome = async (req, res) => {
    const income = await findByUserId(req.user.id)
    return res.json({success: true, data: income})
}