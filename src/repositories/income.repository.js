import {query} from '../database/db.js'

export const create = async (userId, amount, description) => {
    const sql = 'INSERT INTO income (user_id, amount, description) VALUES ($1, $2, $3) RETURNING *'
    const values = [userId, amount, description]
    const {rows} = query(sql, values)
}