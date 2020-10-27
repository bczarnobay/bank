import { Router } from 'express'
import AccountController from './controllers/AccountController'
import TransactionController from './controllers/TransactionController'
// import PaymentController from './controllers/PaymentController'

const routes = Router()

routes.get('/accounts/', AccountController.index)
routes.get('/accounts/:id', AccountController.view)
routes.post('/accounts/', AccountController.create)

routes.get('/accounts/:id/transactions/', TransactionController.view)
routes.post('/accounts/:id/transactions/', TransactionController.create)

// routes.post('/accounts/:id/payments/:id', PaymentController.index)
// routes.get('/accounts/:id/payments/', PaymentController.view)

export default routes
