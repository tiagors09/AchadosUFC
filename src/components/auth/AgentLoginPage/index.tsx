import { toast } from "sonner";
import AgentLoginForm from "../AgentLoginForm";

export default function AgentLoginPage() {
  const handleLogin = async (data: { login: string; password: string }) => {
    try {
      console.log('Dados enviados:', data)
      await new Promise(res => setTimeout(res, 500))
      toast.success('Seus dados foram enviados.')
    } catch (error) {
      toast.error('Erro ao enviar os dados.')
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Entrar</h1>
        <AgentLoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}
