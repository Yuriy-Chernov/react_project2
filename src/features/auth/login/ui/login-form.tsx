import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { loginSchema, type LoginValues } from '@/entities/session'
import { ApiError } from '@/shared/api'
import { Button, Input } from '@/shared/ui'

import { useLogin } from '../model/use-login'

type LoginFormProps = {
  from?: string
}

function LoginForm({ from }: LoginFormProps) {
  const loginMutation = useLogin(from)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const errorMessage =
    loginMutation.error instanceof ApiError
      ? loginMutation.error.message
      : loginMutation.isError
        ? 'Failed to login'
        : null

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Login</h1>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit((values) => loginMutation.mutate(values))}
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Login
          <Input
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
            {...register('username')}
          />
          {errors.username ? (
            <span className="font-normal text-red-600">{errors.username.message}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Password
          <Input
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            {...register('password')}
          />
          {errors.password ? (
            <span className="font-normal text-red-600">{errors.password.message}</span>
          ) : null}
        </label>

        {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

        <Button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Login…' : 'Login'}
        </Button>
      </form>
    </section>
  )
}

export { LoginForm }
export type { LoginFormProps }
