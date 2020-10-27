import DbHandler from '../../utils/db-handler'
import { accountMock } from '../../mocks/AccountMock'
import AccountService from '../../../src/services/AccountService'

describe('Account service', () => {
  beforeAll(async () => { await DbHandler.connect() })

  afterEach(async () => await DbHandler.clearDatabase())

  afterAll(async () => await DbHandler.closeDatabase())

  it('should create a new account', async () => {
    const account = await AccountService.createAccount()
    const response = await AccountService.retrieveOneAccount(account)
    
    expect(response).toBeDefined()
  })

  it('should list all accounts', async () => {
    await AccountService.createAccount()
    await AccountService.createAccount()

    const response = await AccountService.retrieveAccounts()
    expect(response.total).toBe(2)
  })
})