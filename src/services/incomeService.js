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

export const getIncome = async (userId, incomeId) => {
    if (!userId || userId <= 0 || !incomeId || incomeId <= 0) {
        const error = new Error('Invalid data: userId and incomeId must be greater than zero')
        error.StatusCode = 400
        throw error
    }

    const income = await incomeRepository.findById(incomeId)

    if (!income) {
        const error = new Error('There is no income with this ID')
        error.statusCode = 404
        throw error
    }

    if (income.user_id !== userId) {
        const error = new Error('Unauthorized')
        error.statuCode = 409
        throw error
    }

    return income
}

export const listUserIncome = async (userId) => {
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

export const deleteIncome = async (userId, incomeId) => {
    if (!userId || userId <= 0 || !incomeId || incomeId <= 0) {
        const error = new Error('Invalid data: userId and incomeId must be greater than zero')
        error.StatusCode = 400
        throw error
    }

    let income = await incomeRepository.findById(incomeId)

    if (!income) {
        const error = new Error('There is no income with this ID')
        error.statusCode = 404
        throw error
    }

    if (income.user_id !== userId) {
        const error = new Error('Unauthorized')
        error.statuCode = 409
        throw error
    }

    income = incomeRepository.deleteById(incomeId)

    return income
}