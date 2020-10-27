import DbHandler from '../../utils/db-handler'
import { transactionMock } from '../../mocks/TransactionMock'
import AccountService from '../../../src/services/AccountService'
import TransactionService from '../../../src/services/TransactionService'
import  { ITransaction } from '../../../src/models/interfaces/transaction'

describe('Transaction service', () => {
  beforeAll(async () => { await DbHandler.connect() })

  afterEach(async () => await DbHandler.clearDatabase())

  afterAll(async () => await DbHandler.closeDatabase())

  it('should create a transaction', async () => {
    let account
      account = await AccountService.createAccount()

    const response = await TransactionService.makeTransaction(account, 10, 'Deposit')
    
    expect(response).toBeDefined()
    expect(response.currentBalance).toBe(10)
  })

  it('should list all accounts', async () => {
    
  })
})