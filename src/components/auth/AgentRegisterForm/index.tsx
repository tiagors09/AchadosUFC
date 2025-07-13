import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { AgentRegisterData, AgentRegisterFormProps } from '../AgentForm.types'

export default function AgentRegisterForm({ onRegister }: AgentRegisterFormProps) {
  const form = useForm<AgentRegisterData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => {
          if (data.password !== data.confirmPassword) {
            form.setError('confirmPassword', { message: 'Senhas não coincidem' })
            return
          }
          onRegister(data)
        })}
        className="space-y-4 max-w-sm mx-auto"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: 'Email obrigatório',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Digite um email válido'
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
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

        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{ required: 'Confirme a senha' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirme a senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Cadastrar
        </Button>
      </form>
    </Form>
  )
}
