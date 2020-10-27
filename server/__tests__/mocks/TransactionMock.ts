import { ITransaction } from '../../src/models/interfaces/transaction'

export const transactionMock: ITransaction = {
    accountId: '12345',
    amount: 10,
    createdAt: new Date('2020-10-25T15:23:32.779Z'),
    type: 'Deposit'
}