import express from 'express'
import routes from './routes'
import Db from './db'
import cors from 'cors'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
    this.database()
  }

  private routes (): void {
    this.express.use('/v1/', routes)
  }

  private database (): void {
    Db.connect()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded())
    this.express.use(cors())
  }
}

export default new App().express
