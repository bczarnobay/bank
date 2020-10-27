import TransactionRepository from '../repositories/TransactionRepository'
import { ITransaction } from '../models/interfaces/transaction'
import { ITransactionResponse } from '../models/interfaces/transaction-response'
// import { ITransactionDocument } from 'src/models/schemas/Transaction'
import { IAccountDocument } from '../models/schemas/Account'
import AccountRepository from '../repositories/AccountRepository'
import ResponseFormatter from '../utils/ResponseFormatter'
import IResponse from '../models/interfaces/response'
import { IAccountResponse } from 'src/models/interfaces/account-response'

class TransactionService {
  public async getTransactionsByAccount (accountId: string, limit?: number, offset?: number): Promise<IResponse> {
    const account = await AccountRepository.getOne(accountId)
    console.log(limit, offset)
    if(account === null){
      throw new Error('Account does not exist')
    }
    
    const { id } = account

    const transactions = await TransactionRepository.get({ id, limit, offset })
    const total = await TransactionRepository.count({ accountId: id })

    const results = transactions.map((transactions: ITransaction): ITransactionResponse => {
      return {
        createdAt: transactions.createdAt,
        amount: transactions.amount,
        type: transactions.type,
        barcode: transactions.barcode
      }
    })

    return ResponseFormatter(results, limit, offset, total)
  }

  public async makeTransaction (accountId: string, amount: number, type: string, barcode: string): Promise<IAccountResponse> {
    const account = await AccountRepository.getOne(accountId)

    if(account === null){
      throw new Error('Account does not exist')
    }
    
    let { id, currentBalance, status } = account

    currentBalance = this.__validateAndUpdateBalance(amount, type, currentBalance)
    if(currentBalance < 0 ){
       status = 'OVERDRAWN'
    } else {
      status = 'ACTIVE'
    }

    const transaction: ITransaction = {
      accountId: id,
      amount: amount,
      type: type,
      barcode: barcode ?? ''
    }

    try {
      await TransactionRepository.create(transaction)
    } catch (error) {
      throw new Error('Transaction not performed')
    }

    const accountUpdated = await AccountRepository.findOneAndUpdate(
      { accountId: accountId },
      {
        $set:
        { currentBalance: currentBalance,
          status: status
        }
      },
      { new: true }
    )
    
    const accountSummary: IAccountResponse = {
      accountId: accountUpdated.accountId,
      createdAt: accountUpdated.createdAt,
      currentBalance: accountUpdated.currentBalance,
      status: accountUpdated.status
    }
    return accountSummary
  }

  private __validateAndUpdateBalance (amount: number, type:string, currentBalance: number): number {
    if (type === 'Withdrawn' || type === 'Payment') {
      currentBalance -= amount
    } else {
      currentBalance += amount
    }

    return currentBalance
  }
}

export default new TransactionService()
