import mongoose from 'mongoose'
import { ITransaction } from '../interfaces/transaction'

export interface ITransactionDocument extends mongoose.Document, ITransaction {}
    type ITransactionModel = mongoose.Model<ITransactionDocument>

const TransactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['Deposit', 'Withdrawn', 'Payment'],
      required: true
    },
    barcode: {
      type: String,
      size: 20
    }
  }
)

export const Transaction: ITransactionModel = mongoose.model<ITransactionDocument, ITransactionModel>('Transaction', TransactionSchema)
