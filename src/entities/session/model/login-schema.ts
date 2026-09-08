import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(5, 'Enter your username'),
  password: z.string().min(5, 'Enter your password'),
})

type LoginValues = z.infer<typeof loginSchema>

export { loginSchema }
export type { LoginValues }
