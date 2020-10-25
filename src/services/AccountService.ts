import AccountRepository from '../repositories/AccountRepository'
import { IAccount } from '../models/interfaces/account'
import { IAccountDocument } from 'src/models/schemas/Account'

class AccountService {
  public async retrieveAccounts (limit?: number, offset?: number) : Promise<IAccountDocument[]> {
    return await AccountRepository.get({ limit: limit, offset: offset })
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

  public async retrieveOneAccount (accountId: string) : Promise<IAccountDocument> {
    return await AccountRepository.getOne(accountId)
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
