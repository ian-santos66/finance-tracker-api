import pg from 'pg'

const {Pool} = pg
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export async function connectToDatabase() {
    try {
        const client = await pool.connect()
        console.log('connect to postgreeSQL')
        client.release()
    } catch (error) {
        console.error('error to connect to postgreeSQL')
        process.exit(1)
    }
}

export const query = (text, params) => pool.query(text, params)