import { Request, Response } from 'express'
import AccountService from '../services/AccountService'

class AccountController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { limit, offset } = req.query
    try {
      // await AccountService.retrieveAccounts()
      const returnAll = await AccountService.retrieveAccounts(Number(limit), Number(offset))
      console.log(returnAll)
      return res.json(returnAll)
    } catch (error) {
      // res.status(500).sendStatus('')
      res.sendStatus(501)
      // next() ???
    }
  }

  public async view (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    return res.json(await AccountService.retrieveOneAccount(id))
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
