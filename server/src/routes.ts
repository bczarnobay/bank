import { Router } from 'express'
import AccountController from './controllers/AccountController'
import TransactionController from './controllers/TransactionController'
// import TransferController from './controllers/TransferController'

const routes = Router()

routes.get('/accounts/', AccountController.index)
routes.get('/accounts/:id', AccountController.view)
routes.post('/accounts/', AccountController.create)

routes.get('/accounts/:id/transactions/', TransactionController.view)
routes.post('/accounts/:id/transactions/', TransactionController.create)

// routes.post('/accounts/:id/transfer/:id', TransferController.index)
// routes.get('/accounts/:id/transfer/', TransferController.view)

export default routes
