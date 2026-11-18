import {Router} from 'express'
import * as incomeController from '../controllers/incomeController.js'
import authorize from '../middlewares/authMiddleware.js'

const incomeRouter = Router()

incomeRouter.get('/income/:id', authorize, incomeController.show)
incomeRouter.get('/income', authorize, incomeController.getAll)
incomeRouter.post('/income', authorize, incomeController.store)
incomeRouter.delete('/income/:id', authorize, incomeController.remove)


export default incomeRouter