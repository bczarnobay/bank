import { Transaction, ITransactionDocument } from '../models/schemas/Transaction'
import { ITransaction } from '../models/interfaces/transaction'

class TransactionRepository {
  public async get (
    {
      id,
      limit = 5,
      offset = 1
    }:
    {
      id?: string,
      limit?: any,
      offset?: any
   }) : Promise<ITransactionDocument[]> {
    console.log(id)
    return Transaction.find({ accountId: id }).sort({ createdAt: 'desc'})
      .skip((limit * offset) - limit)
      .limit(limit)
  }

  public async getOne (transactionId: string) : Promise<ITransactionDocument> {
    return Transaction.findOne({ transactionId })
  }

  public async create (transaction: ITransaction) : Promise<ITransactionDocument> {
    return Transaction.create(transaction)
  }

  public async findOneAndUpdate (where, data, options) : Promise<ITransactionDocument> {
    return Transaction.findOneAndUpdate(where, data, options)
  }

  public async count (where:any): Promise<number> {
    return Transaction.count(where)
  }
}

export default new TransactionRepository()
