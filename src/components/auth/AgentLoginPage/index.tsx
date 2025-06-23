import { toast } from "sonner"
import AgentLoginForm from "../AgentLoginForm"
import { useAuth } from "../AuthContext";
import { LoginException } from "../AuthExceptions";

export default function AgentLoginPage() {
  const { login } = useAuth()

  async function handleRegister(data: { login: string; password: string }) {
    try {
      await login({ login: data.login })
      toast.success('Login realizado com sucesso!')
    } catch (err) {
      if (err instanceof LoginException) {
        toast.error(err.message)
      } else {
        toast.error('Erro inesperado ao tentar entrar no sistema.')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Entrar</h1>
        <AgentLoginForm onSubmit={handleRegister}/>
      </div>
    </div>
  )
}
