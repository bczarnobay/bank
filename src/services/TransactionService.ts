import TransactionRepository from '../repositories/TransactionRepository'
import { ITransaction } from '../models/interfaces/transaction'
// import { ITransactionDocument } from 'src/models/schemas/Transaction'
import { IAccountDocument } from 'src/models/schemas/Account'
import AccountRepository from 'src/repositories/AccountRepository'
import ResponseFormatter from '../utils/ResponseFormatter'
import IResponse from 'src/models/interfaces/response'

class TransactionService {
  public async getTransactionsByAccount (accountId: string, limit?: number, offset?: number): Promise<IResponse> {
    const { id } = await AccountRepository.getOne(accountId)
    const transactions = await TransactionRepository.get({ id, limit, offset })
    const total = await TransactionRepository.count({ accountId: id })

    return ResponseFormatter(transactions, limit, offset, total)
  }

  public async makeTransaction (accountId: string, amount: number, type: string): Promise<IAccountDocument> {
    let { id, currentBalance } = await AccountRepository.getOne(accountId)

    try {
      currentBalance = this.__validateAndUpdateBalance(amount, type, currentBalance)
    } catch (error) {
      throw new Error(error.message)
    }
    const transaction: ITransaction = {
      accountId: id,
      amount: amount,
      type: type
    }

    try {
      await TransactionRepository.create(transaction)
    } catch (error) {
      console.log('aqui foi')
      throw new Error('insuficiente balance')
    }

    const accountUpdated = await AccountRepository.findOneAndUpdate(
      { accountId: accountId },
      {
        $set:
        { currentBalance: currentBalance }
      },
      { new: true }
    )

    return accountUpdated
  }

  private __validateAndUpdateBalance (amount: number, type:string, currentBalance: number): number {
    if (currentBalance < 0) {
      throw new Error('Insuficient balance.')
    }

    if (type === 'Withdrawn' || type === 'Payment') {
      if (amount < currentBalance) {
        throw new Error('Insuficient balance.')
      }
      currentBalance -= amount
    } else {
      currentBalance += amount
    }

    return currentBalance
  }
}

export default new TransactionService()
