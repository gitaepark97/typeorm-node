import { createConnection } from 'typeorm'
import { Banker } from './entities/Banker'
import { Client } from './entities/Client'

const main = async () => {
  try {
    await createConnection({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'hgr30209!',
      database: 'typeorm',
      entities: [Client, Banker],
      synchronize: true,
    })
    console.log('Connected to MariaDB')
  } catch (error) {
    console.error(error)
    throw new Error('Unable to connect to DB')
  }
}

main()
