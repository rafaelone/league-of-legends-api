import { env } from './env'
import { app } from './http/server'

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running')
})
