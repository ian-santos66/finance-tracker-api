import {query} from '../database/db.js'

export const create = async (name, email, password) => {
    const sql = 'INSERT INTO users (name, email, hash_password) VALUES($1, $2, $3) RETURNING *'
    const values = [name, email, password]
    const { rows } = await query(sql, values)
    return rows
}

export const findByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = $1'
    const value = [email]
    const {rows} = await query(sql, value)
    return rows
}

export const findById = async (id) => {
    const sql = 'SELECT * FROM users WHERE id = $1'
    const value = [id]
    const {rows} = await query(sql, value)
    return rows
}

