import AccountRepository from '../repositories/AccountRepository'
import { IAccount } from '../models/interfaces/account'
import { IAccountResponse } from '../models/interfaces/account-response'
import IResponse from 'src/models/interfaces/response'
import ResponseFormatter from '../utils/ResponseFormatter'

class AccountService {
  public async retrieveAccounts (limit?: number, offset?: number) : Promise<IResponse> {
    const accounts = await AccountRepository.get({ limit: limit, offset: offset })
    const total = await AccountRepository.count({})

    const results = accounts.map((account:IAccount): IAccountResponse => {
      return {
        accountId: account.accountId,
        currentBalance: account.currentBalance,
        createdAt: account.createdAt,
        status: account.status
      }
    })

    return ResponseFormatter(results, limit, offset, total)
  }

  public async createAccount () : Promise<String> {
    const accountId = this.__getNewAccountId()

    const account: IAccount = {
      accountId: accountId,
      currentBalance: 0.00
    }

    try {
      await AccountRepository.create(account)
      return accountId
    } catch {
      throw new Error('Error when creating new account.')
    }
  }

  public async retrieveOneAccount (accountId: string) : Promise<IAccountResponse> {
    const account = await AccountRepository.getOne(accountId)

    const result: IAccountResponse = {
      accountId: account.accountId,
      currentBalance: account.currentBalance,
      createdAt: account.createdAt
    }

    return result
  }

  private __generateRandomAccountId () : string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  private async __accountIdExists (id: string) : Promise<boolean> {
    return await AccountRepository.exists(id)
  }

  private __getNewAccountId () : string {
    let accountId = this.__generateRandomAccountId()

    if (this.__accountIdExists(accountId)) {
      accountId = this.__generateRandomAccountId()
    }

    return accountId
  }
}

export default new AccountService()
