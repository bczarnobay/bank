import { Request, Response } from 'express'
import AccountService from '../services/AccountService'

class AccountController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { limit, offset } = req.query
    try {
      const returnAll = await AccountService.retrieveAccounts(Number(limit), Number(offset))
      return res.json(returnAll)
    } catch (error) {
      res.sendStatus(501)
    }
  }

  public async view (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const account = await AccountService.retrieveOneAccount(id)
    return res.json(account)
  }

  public async create (req: Request, res:Response): Promise<Response> {
    try {
      const account = await AccountService.createAccount()
      console.log(account)
      return res.json({ account: account })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}

export default new AccountController()
