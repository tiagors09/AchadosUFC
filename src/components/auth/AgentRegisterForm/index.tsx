import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { AgentRegisterData, AgentRegisterFormProps } from '../AgentForm.types'


export default function AgentRegisterForm({ onSubmit }: AgentRegisterFormProps) {
  const form = useForm<AgentRegisterData>({
    defaultValues: {
      login: '',
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
          onSubmit(data)
        })}
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

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </Form>
  )
}
