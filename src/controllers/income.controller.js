import {create, findByUserId} from '../repositories/income.repository.js'
import {createIncome} from '../services/income.service.js'
export const newIncome = async (req, res) => {
    try {
        const {amount, description} = req.body
        const income = await createIncome(req.user.id, amount, description)
        return res.json({success: true, data: income})
    } 
    catch (error) {
        const status = error.statusCode || 500
        return res.staus(status).json({success: false, message: error.message})
    }
}

export const getUserIncome = async (req, res) => {
    const income = await findByUserId(req.user.id)
    return res.json({success: true, data: income})
}