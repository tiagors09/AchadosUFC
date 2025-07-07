import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';
import AuthService from '../auth/AuthService';
import { toast } from 'sonner';
import type { ItemData, UploadedItem, ItemContextType } from './ItemTypes';

const ItemContext = createContext<ItemContextType | undefined>(undefined);
const FIREBASE_DB_URL = import.meta.env.VITE_DATABASE_URL;

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const { idToken, refreshToken, updateTokens, logout } = useAuth();

  useEffect(() => {
    getItems();
  }, []);

  /**
   * Realiza uma requisição autenticada ao Firebase, atualizando o token se necessário.
   * 
   * @param {string} input - URL base da requisição.
   * @param {RequestInit} [init] - Opções adicionais para a requisição fetch.
   * @returns {Promise<Response>} - Resposta da requisição fetch.
   * @throws {Error} - Se a sessão estiver expirada.
   */
  async function authFetch(input: string, init?: RequestInit): Promise<Response> {
    // Obtem token atualziado (se necessária a atualização).
    const refreshed = await AuthService.refreshTokenIfNeeded(idToken, refreshToken);
    if (!refreshed) {
      toast.error('Sessão expirada. Faça login novamente.');
      logout();
      throw new Error('Sessão expirada');
    }
    
    // Atualizar contexto de autenticação.
    updateTokens(refreshed.idToken, refreshed.refreshToken, refreshed.user);
    
    // Montar requisição com o auth token.
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

  /**
   * Envia um novo item para o banco de dados.
   * 
   * @param {ItemData} item - Dados do item a ser enviado.
   * @returns {Promise<void>}
   * @throws {Error} - Se ocorrer erro ao salvar o item.
   */
  async function uploadItem(item: ItemData): Promise<void> {
    const res = await authFetch(
      `${FIREBASE_DB_URL}/items.json`,
      { 
        method: 'POST', 
        body: JSON.stringify({ 
          ...item, 
          createdAt: new Date().toISOString() 
        }) 
      }
    );
    if (!res.ok) throw new Error('Erro ao salvar item. Tente novamente mais tarde.');
    await getItems();
  }

  /**
   * Atualiza um item existente no banco de dados.
   * 
   * @param {string} id - ID do item a ser atualizado.
   * @param {ItemData} item - Novos dados do item.
   * @returns {Promise<void>}
   * @throws {Error} - Se ocorrer erro ao atualizar o item.
   */
  async function updateItem(id: string, item: ItemData): Promise<void> {
    const res = await authFetch(
      `${FIREBASE_DB_URL}/items/${id}.json`,
      { 
        method: 'PATCH', 
        body: JSON.stringify({ 
          ...item, 
          createdAt: new Date().toISOString() 
        }) 
      }
    );
    if (!res.ok) throw new Error('Erro ao atualizar item. Tente novamente mais tarde.');
    await getItems();
  }

  /**
   * Remove um item do banco de dados.
   * 
   * @param {string} id - ID do item a ser removido.
   * @returns {Promise<void>}
   * @throws {Error} - Se ocorrer erro ao excluir o item.
   */
  async function deleteItem(id: string): Promise<void> {
    const res = await authFetch(
      `${FIREBASE_DB_URL}/items/${id}.json`,
      { method: 'DELETE' }
    );
    if (!res.ok) throw new Error('Erro ao excluir item. Tente novamente mais tarde.');
    setItems(prev => prev.filter(item => item.id !== id));
  }

  /**
   * Busca todos os itens do banco de dados e atualiza o estado local.
   * 
   * @returns {Promise<void>}
   */
  async function getItems(): Promise<void> {
    const res = await fetch(`${FIREBASE_DB_URL}/items.json`);
    const data = await res.json();
    if (!data) {
      setItems([]);
      return;
    }
    const parsed: UploadedItem[] = Object.entries(data).map(([id, item]) => ({ id, ...(item as Omit<UploadedItem, 'id'>) }));
    setItems(parsed);
  }

  /**
   * Busca um item pelo seu ID.
   * 
   * @param {string} id - ID do item a ser buscado.
   * @returns {Promise<UploadedItem | null>} - O item encontrado ou null se não existir.
   */
  async function getItemById(id: string): Promise<UploadedItem | null> {
    const res = await fetch(`${FIREBASE_DB_URL}/items/${id}.json`);
    const data = await res.json();
    return data ? { id, ...(data as Omit<UploadedItem, 'id'>) } : null;
  }

  return (
    <ItemContext.Provider value={{ items, uploadItem, updateItem, getItemById, getItems, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de itens.
 * 
 * @returns {ItemContextType} - O contexto de itens.
 * @throws {Error} - Se usado fora de um ItemProvider.
 */
export function useItems() {
  const context = useContext(ItemContext);
  if (!context) throw new Error('useItems deve ser usado dentro de um ItemProvider');
  return context;
}
