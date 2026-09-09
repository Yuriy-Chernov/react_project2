import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCart } from '@/entities/cart'
import { Button, Input } from '@/shared/ui'

import { checkoutSchema, type CheckoutValues } from '../model/checkout-schema'

type CheckoutFormProps = {
  onBack: () => void
  onCreated: () => void
}

function CheckoutForm({ onBack, onCreated }: CheckoutFormProps) {
  const { clear } = useCart()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  function submit() {
    clear()
    onCreated()
  }

  return (
    <form className="mt-8 flex max-w-md flex-col gap-4" onSubmit={handleSubmit(submit)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Checkout</h2>
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          Back
        </Button>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Name
        <Input autoComplete="name" aria-invalid={Boolean(errors.name)} {...register('name')} />
        {errors.name ? (
          <span className="font-normal text-red-600">{errors.name.message}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Email
        <Input
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email ? (
          <span className="font-normal text-red-600">{errors.email.message}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Phone
        <Input
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register('phone')}
        />
        {errors.phone ? (
          <span className="font-normal text-red-600">{errors.phone.message}</span>
        ) : null}
      </label>

      <Button type="submit">Place order</Button>
    </form>
  )
}

export { CheckoutForm }
export type { CheckoutFormProps }
