import mongoose from 'mongoose'
import { IAccount } from '../interfaces/account'

export interface IAccountDocument extends mongoose.Document, IAccount {}
    type IAccountModel = mongoose.Model<IAccountDocument>

const AccountSchema = new mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    currentBalance: {
      type: Number,
      required: true,
      trim: false
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    }
  }
)

export const Account: IAccountModel = mongoose.model<IAccountDocument, IAccountModel>('Account', AccountSchema)
