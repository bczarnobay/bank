import { Request, Response } from 'express'
import TransactionService from '../services/TransactionService'

class TransactionController {
  public async view (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    return res.json(await TransactionService.getTransactionsByAccount(id))
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { amount, type } = req.body

    try {
      return res.json(await TransactionService.makeTransaction(id, amount, type))
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  }
}

export default new TransactionController()
