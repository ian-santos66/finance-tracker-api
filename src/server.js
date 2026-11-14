import 'dotenv/config'
import express from 'express'
import authRouter from './routes/auth.routes.js'
import {connectToDatabase, query} from './database/db.js'

const app = express()
const port = process.env.PORT || 5555

app.use(express.json())
app.use('/api/v1/', authRouter)
app.get('/', (req, res) => {
    res.send('Hello World')
})

const startServer = async () => {
    await connectToDatabase()

    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}

startServer()

