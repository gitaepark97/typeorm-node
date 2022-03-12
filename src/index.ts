import { createConnection } from 'typeorm'
import express from 'express'
import { Banker } from './entities/Banker'
import { Client } from './entities/Client'
import { Transaction } from './entities/Transaction'
import { createClientRouter } from './routes/create_client'
import { createBankerRouter } from './routes/create_banker'

const app = express()

const main = async () => {
  try {
    await createConnection({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'typeorm',
      entities: [Client, Banker, Transaction],
      synchronize: true,
    })
    console.log('Connected to MariaDB')

    app.use(express.json())
    app.use(createClientRouter)
    app.use(createBankerRouter)

    app.listen(8000, () => {
      console.log('Now running on port 8000')
    })
  } catch (error) {
    console.error(error)
    throw new Error('Unable to connect to DB')
  }
}

main()
