import {query} from '../database/db.js'

export const create = async (userId, amount, description) => {
    const sql = 'INSERT INTO income (user_id, amount, description) VALUES ($1, $2, $3) RETURNING *'
    const values = [userId, amount, description]
    const {rows} =  await query(sql, values)
    return rows
}

export const findByUserId = async (userId) => {
    const sql = 'SELECT * FROM income WHERE user_id = $1'
    const value = [userId]
    const {rows} = await query(sql, value)
    return rows
}