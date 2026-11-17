import {query} from '../database/db.js'

export const create = async (userId, amount, description) => {
    const sql = 'INSERT INTO income (user_id, amount, description) VALUES ($1, $2, $3) RETURNING *'
    const values = [userId, amount, description]
    const {rows} =  await query(sql, values)

    return rows[0] || null
}

export const findByUserId = async (userId) => {
    const sql = 'SELECT * FROM income WHERE user_id = $1'
    const value = [userId]
    const {rows} = await query(sql, value)

    return rows || null
}

export const deleteById = async (incomeId) => {
    const sql = 'DELETE FROM income WHERE id = $1'
    const value = [incomeId]
    const {rows} = await query(sql, value)

    return rows[0] || null
}