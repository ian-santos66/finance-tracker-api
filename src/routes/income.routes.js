import {Router} from 'express'
import {newIncome} from '../controllers/income.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const incomeRouter = Router()

incomeRouter.post('/income', authorize, newIncome)

export default incomeRouter