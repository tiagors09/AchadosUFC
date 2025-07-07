import { Routes, Route, Navigate } from "react-router";
import App from './App';
import AgentLoginPage from "./components/auth/AgentLoginPage";
import AgentRegisterPage from "./components/auth/AgentRegisterPage";
import ItemListPage from "./components/items/ItemListPage";
import { useAuth } from './components/auth/AuthContext';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='auth'>
        <Route path='login' element={<AgentLoginPage />} />
        <Route path='register' element={<AgentRegisterPage />} />
      </Route>
      <Route path='agent/item/list' element={
        isAuthenticated ?
          <ItemListPage editable={true} /> :
          <Navigate to='/auth/login'/>
      } />
    </Routes>
  )
}
