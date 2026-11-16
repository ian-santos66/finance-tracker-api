import {Router} from 'express'
import {newIncome, getUserIncome} from '../controllers/income.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const incomeRouter = Router()

incomeRouter.get('/income', authorize, getUserIncome)
incomeRouter.post('/income', authorize, newIncome)


export default incomeRouter