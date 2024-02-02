// console.log('helo world')
import express, { type Application } from 'express'

import 'dotenv/config'
import appMiddleware from './middleware'

const app: Application = express()
const port: number =
  process.env.port != null ? parseInt(process.env.port) : 3000

app.use(appMiddleware)

app.listen(port, () => {
  console.log(`app Listening on port : http://locahost:${port}`)
})
