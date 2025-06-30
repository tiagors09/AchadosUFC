// src/AppRoutes.tsx
import { Routes, Route } from "react-router"
import App from './App'
import AgentLoginPage from "./components/auth/AgentLoginPage"
import AgentRegisterPage from "./components/auth/AgentRegisterPage"
import ItemListPage from "./components/items/ItemListPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='auth'>
        <Route path='login' element={<AgentLoginPage />} />
        <Route path='register' element={<AgentRegisterPage />} />
      </Route>
      <Route path='agent/item/list' element={<ItemListPage editable={true} />} />
    </Routes>
  )
}
