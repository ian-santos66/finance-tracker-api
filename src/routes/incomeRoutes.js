import {Router} from 'express'
import {newIncome, getUserIncome} from '../controllers/incomeController.js'
import authorize from '../middlewares/authMiddleware.js'

const incomeRouter = Router()

incomeRouter.get('/income', authorize, getUserIncome)
incomeRouter.post('/income', authorize, newIncome)


export default incomeRouter