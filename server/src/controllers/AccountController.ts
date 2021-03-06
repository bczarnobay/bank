import { request, Request, Response } from 'express'
import AccountService from '../services/AccountService'

class AccountController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { limit, offset } = req.query
    try {
      const returnAll = await AccountService.retrieveAccounts(Number(limit), Number(offset))
      return res.json(returnAll)
    } catch (error) {
      res.status(400).send({message: error.message})
    }
  }

  public async view (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const account = await AccountService.retrieveOneAccount(id)
      return res.json(account)
    } catch (error) {
      res.status(400).send({message: error.message})
    }
  }

  public async create (req: Request, res:Response): Promise<Response> {
    try {
      const account = await AccountService.createAccount()
      return res.json({ account: account })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}

export default new AccountController()
