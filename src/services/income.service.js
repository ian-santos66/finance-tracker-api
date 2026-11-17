import {create} from '../repositories/income.repository.js'

export const createIncome = async (userId, amount, description) => {
    if (!userId || userId <= 0 || !amount || amount <= 0) {
        const error = new Error('Invalid data: userId and amount must be greater than zero')
        error.statusCode = 400
        throw error
    }

    const income = await create(userId, amount, description)

    if (!income) {
        const error = new Error('Error: income not created')
        error.statusCode = 500
        throw error
    }

    return income
}