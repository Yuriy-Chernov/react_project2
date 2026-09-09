import { z } from 'zod'

const checkoutSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name').max(20, 'Enter a valid name'),
  email: z.string().trim().toLowerCase().email('Enter a valid email'),
  phone: z
    .string()
    .trim()
    .regex(/^\+375\d{9}$|^80\d{9}$/, 'Enter a Belarus phone: +375-29-1111111 or 80-29-1111111')
    .transform((value) => (value.startsWith('80') ? `+375${value.slice(2)}` : value)),
})

type CheckoutValues = z.infer<typeof checkoutSchema>

export { checkoutSchema }
export type { CheckoutValues }
