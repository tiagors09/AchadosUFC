import { Routes, Route, Navigate } from "react-router";
import AgentLoginPage from "./components/auth/AgentLoginPage";
import AgentRegisterPage from "./components/auth/AgentRegisterPage";
import ItemListPage from "./components/items/ItemListPage";
import { useAuth } from './components/auth/AuthContext';
import { RetrievedItemProvider } from "./components/items/RetrievedItemContext";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path='/' element={
        <RetrievedItemProvider isAuthenticatedContext={false}>
          <ItemListPage editable={false} showRetrievedItemsSection={false} />
        </RetrievedItemProvider>
      } />
      <Route path='auth'>
        <Route path='login' element={<AgentLoginPage />} />
        <Route path='register' element={<AgentRegisterPage />} />
      </Route>
      <Route path='agent/item/list' element={
        isAuthenticated ?
          <RetrievedItemProvider isAuthenticatedContext={true}>
            <ItemListPage editable={true} showRetrievedItemsSection={true} />
          </RetrievedItemProvider> :
          <Navigate to='/auth/login'/>
      } />
    </Routes>
  )
}
