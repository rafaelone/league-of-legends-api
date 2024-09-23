import dotenv from 'dotenv'
import { z } from 'zod'

// Carregar as variáveis do arquivo .env
dotenv.config()

// Definir o schema de validação para as variáveis de ambiente
const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
})

// Validar as variáveis de ambiente carregadas
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠️ Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables.')
}

// Exportar as variáveis validadas
export const env = _env.data
