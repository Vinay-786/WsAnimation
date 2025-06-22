import { Hono } from "hono";
import { upgradeWebSocket } from 'hono/cloudflare-workers'

export const app = new Hono()
  .get('/api/', (c) => {
    return c.json({ name: 'Cloudflare' })
  })
  .get(
    '/ws',
    upgradeWebSocket(() => {
      return {
        onMessage(event, ws) {
          const data = JSON.parse(event.data)
          console.log("data", data)

          ws.send(JSON.stringify({ payload: `reply of ${data.payload}` }))
        },
        onClose: () => {
          console.log('Connection closed')
        },
      }
    })
  )
