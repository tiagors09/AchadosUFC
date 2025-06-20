import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { AgentLoginData, AgentLoginFormProps } from '../AgentForm.types'

export default function AgentLoginForm({ onSubmit }: AgentLoginFormProps) {
  const form = useForm<AgentLoginData>({
    defaultValues: {
      login: '',
      password: ''
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm mx-auto"
      >
        <FormField
          control={form.control}
          name="login"
          rules={{
            required: 'Login obrigatório',
            minLength: { value: 8, message: 'Deve ter pelo menos 8 caracteres' },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Apenas letras, números e underscore são permitidos'
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input placeholder="Seu login" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          rules={{
            required: 'Senha obrigatória',
            minLength: { value: 8, message: 'Senha deve ter ao menos 8 caracteres' }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </Form>
  )
}
