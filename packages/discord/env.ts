import { z } from 'zod'

const envSchema = z.object({
  DISCORD_BOT_TOKEN: z.string(),
  DATABASE_URL: z.string().url(),
})

const envValidation = envSchema.safeParse(process.env)

if (!envValidation.success) {
  throw new Error(envValidation.error.message)
}

export const env = envValidation.data
