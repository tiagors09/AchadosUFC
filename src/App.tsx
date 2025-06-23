import AgentLoginPage from './components/auth/AgentLoginPage'
import { AuthProvider } from './components/auth/AuthContext'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <AuthProvider>
      <AgentLoginPage/>
      <Toaster />
    </AuthProvider>
  )
}

export default App
