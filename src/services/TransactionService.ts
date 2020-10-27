import TransactionRepository from '../repositories/TransactionRepository'
import { ITransaction } from '../models/interfaces/transaction'
import { ITransactionResponse } from '../models/interfaces/transaction-response'
// import { ITransactionDocument } from 'src/models/schemas/Transaction'
import { IAccountDocument } from '../models/schemas/Account'
import AccountRepository from '../repositories/AccountRepository'
import ResponseFormatter from '../utils/ResponseFormatter'
import IResponse from '../models/interfaces/response'

class TransactionService {
  public async getTransactionsByAccount (accountId: string, limit?: number, offset?: number): Promise<IResponse> {
    const { id } = await AccountRepository.getOne(accountId)
    const transactions = await TransactionRepository.get({ id, limit, offset })
    const total = await TransactionRepository.count({ accountId: id })

    const results = transactions.map((transactions: ITransaction): ITransactionResponse => {
      return {
        createdAt: transactions.createdAt,
        amount: transactions.amount,
        type: transactions.type
      }
    })

    return ResponseFormatter(results, limit, offset, total)
  }

  public async makeTransaction (accountId: string, amount: number, type: string): Promise<IAccountDocument> {
    const account = await AccountRepository.getOne(accountId)

    if(account === null){
      throw new Error('Account does not exist')
    }
    
    let { id, currentBalance } = account

    try {
      currentBalance = this.__validateAndUpdateBalance(amount, type, currentBalance)
      console.log(currentBalance)
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
    console.log(accountUpdated)

    return accountUpdated
  }

  private __validateAndUpdateBalance (amount: number, type:string, currentBalance: number): number {
    console.log('cheguei aqui')

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
