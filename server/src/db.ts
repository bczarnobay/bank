import config from 'config'
import mongoose from 'mongoose'

class Db {
  public connect (): void {
    const mongoConfig = config.get<{url: string}>('mongo')

    mongoose.connect(mongoConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const connection = mongoose.connection
    connection.once('open', () => {
      console.log('Mongo connection established successful')
    })
  }
}

export default new Db()
