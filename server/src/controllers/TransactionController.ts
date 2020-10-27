import { Request, Response } from 'express'
import TransactionService from '../services/TransactionService'

class TransactionController {
  public async view (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { limit, offset } = req.query

    return res.json(await TransactionService.getTransactionsByAccount(id, Number(limit), Number(offset)))
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { amount, type, barcode } = req.body
    
    if (amount < 0 ){
      res.status(400).send({message: 'Amount must be bigger than 0 to perform the transaction'})
    }

    if (type === 'Payment' && barcode === null){
      res.status(400).send({message: 'Barcode must be informed to perform the payment'})
    }

    try {
      return res.json(await TransactionService.makeTransaction(id, amount, type, barcode))
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  }
}

export default new TransactionController()
