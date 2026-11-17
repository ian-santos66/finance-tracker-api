import * as incomeService from '../services/incomeService.js'
export const newIncome = async (req, res) => {
    try {
        const {amount, description} = req.body
        const income = await incomeService.createIncome(req.user.id, amount, description)
        return res.json({success: true, data: income})
    } 
    catch (error) {
        const status = error.statusCode || 500
        return res.staus(status).json({success: false, message: error.message})
    }
}

export const getUserIncome = async (req, res) => {
    try {
        const income = await incomeService.getIncome(req.user.id)
        return res.json({success: true, data: income})
    }
    catch (error) {
        const status = error.statusCode || 500
        return res.status(status).json({success: false, message: error.message})
    }
}