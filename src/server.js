import 'dotenv/config'
import express from 'express'
import authRouter from './routes/auth.routes.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/api/v1/', authRouter)
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
