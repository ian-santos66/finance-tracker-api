import {query} from '../database/db.js'

export const addUser = async (name, email, password) => {
    const sql = 'INSERT INTO users (name, email, hash_password) VALUES($1, $2, $3) RETURNING id, name, email'
    const values = [name, email, password]
    const { rows } = await query(sql, values)
    return rows
}

export const getUser = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = $1'
    const value = [email]
    const {rows} = await query(sql, value)
    return rows
}