import { createContext, useContext, useState, useEffect } from "react"
import type { RetrievedItem } from "./ItemTypes"

const RetrievedItemContext = createContext<{
  retrievedItems: RetrievedItem[]
  addRetrievedItem: (data: RetrievedItem) => Promise<void>
} | undefined>(undefined)

const FIREBASE_DB_URL = import.meta.env.VITE_DATABASE_URL

export const RetrievedItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [retrievedItems, setRetrievedItems] = useState<RetrievedItem[]>([])

  async function addRetrievedItem(data: RetrievedItem): Promise<void> {
    const idToken = sessionStorage.getItem('idToken')

    const res = await fetch(
      `${FIREBASE_DB_URL}/retrievedItems/${data.id}.json?auth=${idToken}`, 
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    )

    if (!res.ok) 
      throw new Error("Erro ao salvar retirada.")

    setRetrievedItems((prev) => [...prev, data])
  }

  async function loadRetrievedItems() {
    const res = await fetch(`${FIREBASE_DB_URL}/retrievedItems.json`)
    const data = await res.json()
    
    if (!data) {
      setRetrievedItems([])
      return
    }

    const items: RetrievedItem[] = Object.entries(data).map(([id, value]) => ({
      ...(value as RetrievedItem),
      id
    }))
    setRetrievedItems(items)
  }

  useEffect(() => {
    loadRetrievedItems()
  }, [])

  return (
    <RetrievedItemContext.Provider value={{ retrievedItems, addRetrievedItem }}>
      {children}
    </RetrievedItemContext.Provider>
  )
}

export const useRetrievedItems = () => {
  const ctx = useContext(RetrievedItemContext)
  if (!ctx) throw new Error("useRetrievedItems precisa estar em RetrievedItemProvider")
  return ctx
}
