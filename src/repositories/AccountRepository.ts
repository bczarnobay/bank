import { Account, IAccountDocument } from '../models/schemas/Account'
import { IAccount } from '../models/interfaces/account'

class AccountRepository {
  public async get (
    {
      where,
      limit = 5,
      offset = 1
    }:
    {
      where?: any,
      limit?: any,
      offset?: any
   }) : Promise<IAccountDocument[]> {
    return Account.find(where)
      .skip((limit * offset) - limit)
      .limit(limit)
  }

  public async getOne (accountId: string) : Promise<IAccountDocument> {
    return Account.findOne({ accountId })
  }

  public async create (account: IAccount) : Promise<IAccountDocument> {
    return Account.create(account)
  }

  public async findOneAndUpdate (where, data, options) : Promise<IAccountDocument> {
    return Account.findOneAndUpdate(where, data, options)
  }

  public async exists (accountId: string) : Promise<boolean> {
    return Account.exists({ accountId: accountId })
  }

  public async count (where): Promise<number> {
    return Account.count(where)
  }
}

export default new AccountRepository()
