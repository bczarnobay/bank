import DbHandler from '../../utils/db-handler'
import { accountMock } from '../../mocks/AccountMock'
import AccountService from '../../../src/services/AccountService'

describe('Account service', () => {
  beforeAll(async () => { await DbHandler.connect() })

  afterEach(async () => await DbHandler.clearDatabase())

  afterAll(async () => await DbHandler.closeDatabase())

  it('should create a new account', async () => {
    let account
    try {
      account = await AccountService.createAccount()
    } catch {
      
    }  
    const response = await AccountService.retrieveOneAccount(account)
    
    expect(response).toBeDefined()
  })

  it('should list all accounts', async () => {
    let accountOne 
    let accountTwo 
    accountOne = await AccountService.createAccount()
    accountTwo = await AccountService.createAccount()

    const response = await AccountService.retrieveAccounts()
    expect(response.total).toBe(2)
  })
})