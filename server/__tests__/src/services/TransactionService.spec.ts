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
    let account = await AccountService.createAccount()
    const response = await TransactionService.makeTransaction(account, 10, 'Deposit', '')
    
    expect(response).toBeDefined()
    expect(response.currentBalance).toBe(10)
  })

  it('should set account status to OVERDRAWN when balance is < 0', async () => {
    let account = await AccountService.createAccount()
    const response = await TransactionService.makeTransaction(account, 10, 'Withdrawn', '')

    expect(response).toBeDefined()
    expect(response.status).toBe('OVERDRAWN')
  })

  it('should return an error when account is invalid', async () => {
    let response
    try {
      response = await TransactionService.makeTransaction('12345', 10, 'Withdrawn', '')
    } catch{}
    expect(response).toBeUndefined()
  })

  it('should reset account status to ACTIVE when balance is > 0', async () => {
    let account = await AccountService.createAccount()
    const response = await TransactionService.makeTransaction(account, 10, 'Withdrawn', '')

    expect(response).toBeDefined()
    expect(response.status).toBe('OVERDRAWN')

    const activeResponse = await TransactionService.makeTransaction(account, 20, 'Deposit', '')
    expect(activeResponse).toBeDefined()
    expect(activeResponse.status).toBe('ACTIVE')
    expect(activeResponse.currentBalance).toBe(10) 
  })

  it('should update balance according to transaction type', async () => {
    let account = await AccountService.createAccount()

    const response = await TransactionService.makeTransaction(account, 10, 'Withdrawn', '')
    expect(response).toBeDefined()
    expect(response.currentBalance).toBe(-10)

    const depositResponse = await TransactionService.makeTransaction(account, 20, 'Deposit', '')
    expect(depositResponse).toBeDefined()
    expect(depositResponse.currentBalance).toBe(10) 

    const paymentResponse = await TransactionService.makeTransaction(account, 5, 'Payment', '1234567890')
    expect(paymentResponse).toBeDefined()
    expect(paymentResponse.currentBalance).toBe(5)
  })
})