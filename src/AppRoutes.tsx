import { Routes, Route, Navigate } from "react-router";
import AgentLoginPage from "./components/auth/AgentLoginPage";
import AgentRegisterPage from "./components/auth/AgentRegisterPage";
import ItemListPage from "./components/items/ItemListPage";
import { useAuth } from './components/auth/AuthContext';
import { RetrievedItemProvider } from "./components/items/RetrievedItemContext";
import { useItems } from './components/items/ItemContext';
import { Header } from './components/layout/Header';
import { useLocation } from 'react-router-dom';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const { deleteItemImage } = useItems();
  const location = useLocation();

  const hideHeaderPaths = ['/auth/login', '/auth/register'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path='/' element={
          <RetrievedItemProvider isAuthenticatedContext={false} deleteItemImage={deleteItemImage}>
            <ItemListPage editable={false} showRetrievedItemsSection={false} />
          </RetrievedItemProvider>
        } />
        <Route path='auth'>
          <Route path='login' element={<AgentLoginPage />} />
          <Route path='register' element={<AgentRegisterPage />} />
        </Route>
        <Route path='agent/item/list' element={
          isAuthenticated ?
            <RetrievedItemProvider isAuthenticatedContext={true} deleteItemImage={deleteItemImage}>
              <ItemListPage editable={true} showRetrievedItemsSection={true} />
            </RetrievedItemProvider> :
            <Navigate to='/auth/login'/>
        } />
      </Routes>
    </>
  )
}
