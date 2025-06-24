import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import type { ItemContextType, ItemData, UploadedItem } from './ItemTypes'

const ItemContext = createContext<ItemContextType | undefined>(undefined)

const FIREBASE_DB_URL = import.meta.env.VITE_DATABASE_URL

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<UploadedItem[]>([])

  async function uploadItem(item: ItemData): Promise<void> {
    const idToken = sessionStorage.getItem('idToken')
    if (!idToken) throw new Error('Usuário não autenticado.')

    const payload = {
      ...item,
      createdAt: new Date().toISOString()
    }

    const res = await fetch(`${FIREBASE_DB_URL}/items.json?auth=${idToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Erro ao salvar item.')
    await getItems()
  }

  async function updateItem(id: string, item: ItemData): Promise<void> {
    const idToken = sessionStorage.getItem('idToken')
    if (!idToken) throw new Error('Usuário não autenticado.')

    const payload = {
      ...item,
      createdAt: new Date().toISOString()
    }

    const res = await fetch(`${FIREBASE_DB_URL}/items/${id}.json?auth=${idToken}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Erro ao atualizar item.')
    await getItems()
  }

  async function getItemById(id: string): Promise<UploadedItem | null> {
    const res = await fetch(`${FIREBASE_DB_URL}/items/${id}.json`)
    const data = await res.json()
    return data ? { ...data } : null
  }

  async function getItems(): Promise<void> {
    const res = await fetch(`${FIREBASE_DB_URL}/items.json`)
    const data = await res.json()

    if (!data) {
      setItems([])
      return
    }

    const parsed: UploadedItem[] = Object.values(data)
    setItems(parsed)
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <ItemContext.Provider
      value={{ items, uploadItem, updateItem, getItemById, getItems }}
    >
      {children}
    </ItemContext.Provider>
  )
}

export function useItems() {
  const context = useContext(ItemContext)
  if (!context)
    throw new Error('useItems deve ser usado dentro de um ItemProvider')
  return context
}
