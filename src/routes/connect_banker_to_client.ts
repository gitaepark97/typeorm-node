import express from 'express'
import { Banker } from '../entities/Banker'
import { Client } from '../entities/Client'

const router = express.Router()

router.put('/api/banker/:bankderId/client/:clientId', async (req, res) => {
  const { bankderId, clientId } = req.params

  const banker = await Banker.findOne(parseInt(bankderId))

  const client = await Client.findOne(parseInt(clientId))

  if (banker && client) {
    banker.clients = [client]
    await banker.save()
    return res.json({
      msg: 'banker connected to client',
    })
  } else {
    return res.json({
      msg: 'banker or client not found',
    })
  }
})

export { router as connectBankerToClientRouter }
