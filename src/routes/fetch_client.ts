import express from 'express'
import { createQueryBuilder } from 'typeorm'
import { Client } from '../entities/Client'

const router = express.Router()

router.get('/api/clients', async (req, res) => {
  const clients = await createQueryBuilder(Client, 'client')
    .select('client.first_name')
    .leftJoinAndSelect('client.transactions', 'transactions')
    .where('client.id = :clientId', {
      clientId: 1,
    })
    .getOne()

  return res.json(clients)
})

export { router as fetchClientRouter }
