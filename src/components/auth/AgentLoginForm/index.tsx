import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { AgentLoginData, AgentLoginFormProps } from '../AgentForm.types'

export default function AgentLoginForm({ onSubmit }: AgentLoginFormProps) {
  const form = useForm<AgentLoginData>({
    defaultValues: {
      email: '',
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
          name="email"
          rules={{
            required: 'E-mail obrigatório',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Digite um e-mail válido'
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@dominio.com" {...field} />
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

        <Button type="submit" className="w-full cursor-pointer">
          Entrar
        </Button>
      </form>
    </Form>
  )
}
