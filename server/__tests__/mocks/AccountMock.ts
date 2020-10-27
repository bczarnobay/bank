import { IAccount } from '../../src/models/interfaces/account'

export const accountMock: IAccount = 
{
  accountId: '12345',
  createdAt: new Date('2020-10-25T15:23:32.779Z'),
  currentBalance: 10,
  status: 'ACTIVE'
}