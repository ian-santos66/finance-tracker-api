import {query} from '../database/db.js'

export const addUser = async (name, email, password) => {
    try {
        const sql = 'INSERT INTO users (name, email, hash_password) VALUES($1, $2, $3) RETURNING id, name, email'
        const values = [name, email, password]
        const newUser = await query(sql, values)
        return newUser.rows
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}

export const getUser = (email) => {

}