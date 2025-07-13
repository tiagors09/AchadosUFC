import { createContext, useContext, useState, useEffect } from "react";
import type { RetrievedItem } from "./ItemTypes";
import { useAuth } from '../auth/AuthContext';
import AuthService from '../auth/AuthService';
import { toast } from 'sonner';

interface RetrievedItemContextType {
  retrievedItems: RetrievedItem[];
  addRetrievedItem: (data: RetrievedItem) => Promise<void>;
  deleteRetrievedItem: (id: string) => Promise<void>;
}

const RetrievedItemContext = createContext<RetrievedItemContextType | undefined>(undefined);

const FIREBASE_DB_URL = import.meta.env.VITE_DATABASE_URL;

export const RetrievedItemProvider = ({ children, isAuthenticatedContext, deleteItemImage }: { children: React.ReactNode, isAuthenticatedContext: boolean, deleteItemImage: (itemId: string) => Promise<void> }) => {
  const [retrievedItems, setRetrievedItems] = useState<RetrievedItem[]>([]);
  const { idToken, refreshToken, updateTokens, logout } = useAuth();

  // Helper para adicionar o token do usuário nas requisições.
  async function authFetch(input: string, init?: RequestInit) {
    const refreshed = await AuthService.refreshTokenIfNeeded(idToken, refreshToken);
    if (!refreshed) {
      toast.error('Sessão expirada. Faça login novamente.');
      logout();
      throw new Error('Sessão expirada');
    }
    updateTokens(refreshed.idToken, refreshed.refreshToken, refreshed.user);

    const url = `${input}?auth=${refreshed.idToken}`;
    let headers: HeadersInit | undefined = init?.headers;
    if (init?.body) {
      headers = {
        ...(init?.headers || {}),
        'Content-Type': 'application/json',
      };
    }

    return fetch(url, { ...init, headers });
  }

  async function addRetrievedItem(data: RetrievedItem): Promise<void> {
    const res = await authFetch(
      `${FIREBASE_DB_URL}/retrievedItems/${data.id}.json`,
      { method: "PUT", body: JSON.stringify(data) }
    );
    if (!res.ok) throw new Error("Erro ao salvar retirada.");
    setRetrievedItems(prev => [...prev, data]);
  }

  async function loadRetrievedItems() {
    // Listagem pública: se quiser proteger, use authFetch em vez de fetch
    const res = await authFetch(`${FIREBASE_DB_URL}/retrievedItems.json`);
    const data = await res.json();
    if (!data) {
      setRetrievedItems([]);
      return;
    }
    const items = Object.entries(data)
      .filter((entry) => (entry[1] as RetrievedItem).item !== undefined && (entry[1] as RetrievedItem).item !== null)
      .map(([id, value]) => ({
        ...(value as RetrievedItem),
        id
      }));
    setRetrievedItems(items);
  }

  async function deleteRetrievedItem(id: string): Promise<void> {
    // Get the original item's ID from the retrieved item
    const retrievedItemToDelete = retrievedItems.find(item => item.id === id);
    // Removed: const { deleteItemImage } = useItems(); // Get deleteItemImage from ItemContext

    if (retrievedItemToDelete && retrievedItemToDelete.item.imageUrl) {
      await deleteItemImage(retrievedItemToDelete.item.id); // Use deleteItemImage from props
    }

    const res = await authFetch(
      `${FIREBASE_DB_URL}/retrievedItems/${id}.json`,
      { method: "DELETE" }
    );
    if (!res.ok) throw new Error("Erro ao excluir item recuperado.");
    setRetrievedItems(prev => prev.filter(item => item.id !== id));
  }

  useEffect(() => {
    if (isAuthenticatedContext) {
      loadRetrievedItems();
    }
  }, [isAuthenticatedContext]);

  return (
    <RetrievedItemContext.Provider value={{ retrievedItems, addRetrievedItem, deleteRetrievedItem }}>
      {children}
    </RetrievedItemContext.Provider>
  );
};

export const useRetrievedItems = () => {
  const ctx = useContext(RetrievedItemContext);
  if (!ctx) throw new Error("useRetrievedItems precisa estar em RetrievedItemProvider");
  return ctx;
};