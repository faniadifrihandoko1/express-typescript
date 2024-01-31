// console.log('helo world')
import express, {
  type Request,
  type Response,
  type NextFunction,
  type Application
} from 'express'

import 'dotenv/config'

const app: Application = express()
const port: number =
  process.env.port != null ? parseInt(process.env.port) : 3000

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`app Listening on port : http://localhost:${port}`)
})
