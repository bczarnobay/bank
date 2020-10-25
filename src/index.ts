import app from './app'
import config from 'config'

const appConfig: any = config.get('server')

app.listen(appConfig.port, () => {
  console.log(`Server listening on http://localhost:${appConfig.port}`)
})
