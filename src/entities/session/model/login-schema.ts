import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
})

type LoginValues = z.infer<typeof loginSchema>

export { loginSchema }
export type { LoginValues }
