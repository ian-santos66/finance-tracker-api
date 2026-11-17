import * as incomeRepository from'../repositories/incomeRepository.js' 

export const createIncome = async (userId, amount, description) => {
    if (!userId || userId <= 0 || !amount || amount <= 0) {
        const error = new Error('Invalid data: userId and amount must be greater than zero')
        error.statusCode = 400
        throw error
    }

    const income = await incomeRepository.create(userId, amount, description)

    if (!income) {
        const error = new Error('Error: income not created')
        error.statusCode = 500
        throw error
    }

    return income
}

export const getIncome = async (userId) => {
    if (!userId || userId <= 0) {
        const error = new Error('Invalid data: userId must be greater than zero')
        error.statusCode = 400
        throw error
    }
    const userIncome = await incomeRepository.findByUserId(userId)

    if (!userIncome) {
        const error = new Error('This user no have income')
        error.statusCode = 404
        throw error
    }

    return userIncome
}